const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    schoolName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("student", studentSchema)