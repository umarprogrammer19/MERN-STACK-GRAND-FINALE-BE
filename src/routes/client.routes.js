import express from "express";
import { registerUser } from "../handlers/client.handlers.js";


const router = express.Router()

router.post('/signup', registerUser);
// router.post('/login', signIn)
// router.get('/logout', logOut)
// router.get("/verifyUser", authenticateUser, (req, res) => {
//     res.json({ message: "Hey! You Are Logged In", user: req.user });
// });


export default router;