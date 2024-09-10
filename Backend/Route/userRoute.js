const express = require("express");

const { createUser, getAllUser, updateUser, login, getuserById, deleteUser, confirmUser, forgotPassword, resetPassword, resendConfirmation} = require("../Controller/userController");
const { jwtMiddleware } = require("../Middleware/middleware");
const router = express.Router();

router.post('/register', createUser);
router.get('/users' ,jwtMiddleware, getAllUser);
router.put('/update-user/:id',jwtMiddleware, updateUser)
router.post('/login', login);
router.get('/getUser/:id',jwtMiddleware, getuserById);
router.delete('/delete/:id',jwtMiddleware, deleteUser);
router.get('/confirm-email/:token', confirmUser)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/resend-verification/', resendConfirmation);




module.exports = router;