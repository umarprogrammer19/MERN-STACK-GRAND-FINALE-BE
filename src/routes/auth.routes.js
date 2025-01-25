import express from "express";
import { logOut, signIn, signUp } from "../handlers/users.handlers.js";
import { authenticateUser } from "../middlewares/authorize.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.post('/signup', upload.single("image"), signUp)
router.post('/signin', signIn)
router.get('/logout', logOut)
router.get("/verifyUser", authenticateUser, (req, res) => {
    res.json({ message: "Hey! You Are Logged In", user: req.user });
});


export default router;