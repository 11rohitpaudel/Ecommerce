const bcrypt = require("bcrypt");
const UserModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const { expressjwt: ExpressJWT } = require("express-jwt");
// const { default: mongoose } = require("mongoose");
const SecretKEY = process.env.SECRET_KEY
const mongoose = require("mongoose");
const sendEmail = require("../Utils/sendEmail");

exports.createUser = async (req, res) => {

    const checkEmail = await UserModel.findOne({ email: req.body.email });
    const checkContact = await UserModel.findOne({ 'userDetail.phoneNumber': req.body.phoneNumber });

    if (checkContact) {
        return res.status(400).json({ error: "Already exist" })
    }

    if (checkEmail) {
        return res.status(400).json({ error: "Email already exist" })
    }

    // Generate token for email verification
    const token = await jwt.sign(
        {
            name: req.body.firstName,
            email: req.body.email
        }, SecretKEY,
        { expiresIn: "1h" }
    )

    if (!token) {
        return res.status(400).json({ error: "Failed to generate token" });
    }

    // Send email
    const url = `${process.env.APP_URL}/confirm-email/${token}`

    const mailOptions = {
        userEmail: req.body.email,
        subject: "Email verification",
        text: "Please verify your email",
        html: `<a href="${url}"><button>Verify Account</button></a>`
    }
    sendEmail(mailOptions);

    // Save users data in DB
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const createUser = await new UserModel({
        email: req.body.email,
        password: hashPassword,
        'userDetail.firstName': req.body.firstName,
        'userDetail.middleName': req.body.middleName,
        'userDetail.lastName': req.body.lastName,
        'userDetail.phoneNumber': req.body.phoneNumber,
    })

    const saveUser = await createUser.save();
    if (!saveUser) {
        return res.status(400).json({ error: "User registration failed" });
    } else {
        return res.status(200).json({ message: "User registration succesful, Please verify your email" })
    }
}
// ------------------------------------Verify Email--------------------------------
exports.confirmUser = async (req, res) => {
    const { token } = req.params

    const { email, name } = jwt.decode(token);
    console.log(email)

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    if (user.isverified) {
        return res.status(400).json({ error: "Already verified, Please login to continue" })
    }
    user.isverified = true;
    await user.save();
    return res.status(200).json({ message: "User verified successfully" });
}
exports.getAllUser = async (req, res) => {
    const users = await UserModel.find();
    if (!users) {
        return res.status(400).json({ message: "User not found" })
    } else {
        return res.send(users)
    }
}

exports.updateUser = async (req, res) => {
    const update = await UserModel.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        'userDetail.firstName': req.body.firstName,
        'userDetail.lastName': req.body.lastName,
        'userDetail.gender': req.body.gender,
        'userDetail.address': req.body.address

    }, { new: true })
    if (!update) {
        return res.status(400).json({ message: "Not found" }).status(400);
    }
    res.send(update)
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const checkUser = await UserModel.findOne({ email: email });

    if (!checkUser) {
        return res.status(400).json({ error: "user not found" })
    } else {
        const checkPassword = await bcrypt.compare(password, checkUser.password)

        const access_token = await jwt.sign(
            {
                name: checkUser.userDetail.firstName,
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
            }, process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )

        if (!checkPassword) {
            return res.status(400).json({ error: "Password is invalid" })
        } else {
            return res.status(200).json(
                {
                    messege: "login sucessful",
                    accessToken: access_token,
                    user: checkUser
                })
        }
    }
}

exports.getuserById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await UserModel.findOne({ _id: id });
    // const user = await UserMOdel.findById({ id});

    if (!user) {
        return res.json({ error: "User not found" }).status(400);
    }
    return res.json({ user: user }).status(200);
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findByIdAndDelete(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });

    }

    if (!user) {
        return res.json({ error: "User not found" }).status(400);

    }
    return res.json({ message: "Account Deactivated" }).status(200);
}

//-------------------------------------forget password-------------------------------------

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.json({ error: "User not found" }).status(400);
    }
    const token = await jwt.sign(
        {
            name: req.body.firstName,
            email: req.body.email
        }, SecretKEY,
        { expiresIn: "1h" }
    )

    if (!token) {
        return res.status(400).json({ error: "Failed to generate token" });
    }

    // Send email
    const url = `${process.env.APP_URL}/reset-password/${token}`

    const mailOptions = {
        userEmail: req.body.email,
        subject: "Reset Password",
        text: "Reset Password",
        html: `<a href="${url}"><button>Reset Password</button></a>`
    }
    sendEmail(mailOptions);

    return res.status(200).json({ message: "Reset link has been sent to your email" })
}

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { email, id } = jwt.decode(token);

    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.json({ error: "User not found" }).status(400);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashPassword;

    await user.save()

    if(!user){
        return res.json({ error: "Password not save"}).status(400);

    }
    return res.json({message: "Password reset succesfully"}).status(200);
}

//--------------------------------resend confirmation---------------------------------
exports.resendConfirmation = async (req, res)=>{
    const { email} =req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.json({ error: "User not found" }).status(400);
    }

    if (user.isverified){
        return res.json({ error: "User already verified"})
    }
    const token = await jwt.sign(
        {
            
            email: email
        }, SecretKEY,
        { expiresIn: "1h" }
    )

    if (!token) {
        return res.status(400).json({ error: "Failed to generate token" });
    }

    // Send email
    const url = `${process.env.APP_URL}/confirm-email/${token}`

    const mailOptions = {
        userEmail: req.body.email,
        subject: "Email verification",
        text: "Please verify your email",
        html: `<a href="${url}"><button>Verify Account</button></a>`
    }
    sendEmail(mailOptions);
    return res.status(200).json({message: "Confirmation link has been sent to your email"})
}