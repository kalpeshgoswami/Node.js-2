import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    emp_Id: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }

})

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee;