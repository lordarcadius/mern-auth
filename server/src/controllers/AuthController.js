const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409)
                .json({ message: "User already exists. Please login!", success: false });
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({ message: "Signup successful!", success: true });
    } catch (error) {
        return res.status(500)
            .json({ message: "Internal server error!", success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = "Authentication failed! Email or Password is incorrect."

        if (!user) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }
        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(201)
            .json({ message: "Login successful!", success: true, token, email, name: user.name });
    } catch (error) {
        return res.status(500)
            .json({ message: "Internal server error!", success: false });
    }
}

module.exports = {
    signup,
    login
}