import express from "express";
import { registerUser, resetPassword, signIn } from "../handlers/client.handlers.js";
import { authenticate } from "../middlewares/userRef.middleware.js";


const router = express.Router()

router.post('/signup', registerUser);
router.post('/login', signIn)
router.post('/update-password', authenticate, resetPassword)
// router.get('/logout', logOut)
// router.get("/verifyUser", authenticateUser, (req, res) => {
//     res.json({ message: "Hey! You Are Logged In", user: req.user });
// });


export default router;