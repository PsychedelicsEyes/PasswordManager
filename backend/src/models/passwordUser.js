const mongoose = require('mongoose');

const passwordUserSchema = new mongoose.Schema({
    category: { type: String, required: true },
    username: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PasswordUser', passwordUserSchema);
