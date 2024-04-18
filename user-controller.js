const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists! Login Instead" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        return res.status(201).json({ user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "Couldn't Find The User By This Email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "Login Successfully" });
};
