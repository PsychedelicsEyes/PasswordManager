const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Password = require("../models/password");

exports.signin = async (req, res) => {
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

  const isMatch = await bcrypt.compare(password, passwordFind.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: passwordFind._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
};

exports.verifyToken = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = decoded;

    res.status(200).json({ message: "Token is valid" });
  });
};