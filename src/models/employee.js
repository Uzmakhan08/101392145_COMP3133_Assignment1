const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    salary: Number
});

module.exports = mongoose.model('Employee', employeeSchema);
