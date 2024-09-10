const { expressjwt: ExpressJWT } = require("express-jwt")
const SecretKEY = process.env.SECRET_KEY

const verifyJWT = ExpressJWT({
    secret: SecretKEY,
    algorithms: ["HS256"]
})

exports.jwtMiddleware = (req, res, next) => {
    verifyJWT(req, res, (err) => {
        if (err) {
            return res.status(401).json({ error:'Unathorized' });
        }
        next();
    })
};
