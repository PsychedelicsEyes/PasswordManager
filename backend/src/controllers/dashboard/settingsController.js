const Password = require("../../models/password");
const bcrypt = require("bcrypt");

exports.updatePassword = async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
        });
    }
    
    const passwordFind = await Password.findOne();
    if (!passwordFind) {
        return res.status(400).json({ message: "No password set in the system" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await Password.findByIdAndUpdate(passwordFind._id, { password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Server error" });
    }
};
