const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PasswordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
});

PasswordSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('Password', PasswordSchema);
