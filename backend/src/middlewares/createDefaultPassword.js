const Password = require("../models/password");

async function createDefaultPassword() {
  try {
    const count = await Password.countDocuments();
    if (count === 0) {
      const defaultPassword = new Password({
        password: process.env.DEFAULT_PASSWORD,
      });
      await defaultPassword.save();
      console.log("Default password created successfully.");
    } 
  } catch (error) {
    console.error("Error creating default password:", error);
  }
}

module.exports = createDefaultPassword;