const PasswordUser = require("../../models/passwordUser");

exports.addPassword = async (req, res) => {
    const { category, username, email, password, description } = req.body;

    if (!category || !password) {
        return res.status(400).json({ message: "Category and password fields are required" });
    }

    try {
        const passwordUser = new PasswordUser({ category, username, email, password, description });
        await passwordUser.save();

        res.status(200).json({ message: "Password added successfully", passwordUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getPasswords = async (req, res) => {
    try {
        const passwords = await PasswordUser.find();
        res.status(200).json(passwords);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { category, username, email, password, description } = req.body;

    if (!category || !password) {
        return res.status(400).json({ message: "Category and password fields are required" });
    }

    try {
        const updatedPassword = await PasswordUser.findByIdAndUpdate(id, { category, username, email, password, description }, { new: true });
        if (!updatedPassword) {
            return res.status(404).json({ message: "Password not found" });
        }

        res.status(200).json({ message: "Password updated successfully", updatedPassword });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deletePassword = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPassword = await PasswordUser.findByIdAndDelete(id);
        if (!deletedPassword) {
            return res.status(404).json({ message: "Password not found" });
        }

        res.status(200).json({ message: "Password deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
