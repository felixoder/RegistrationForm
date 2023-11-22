const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique : true
    },
    address:{
        type:String,
        
    }
})
// -----Collection -----------------------

const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register;