import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    grID: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true,
        enum: ["fullstack", "Graphic design"]
    },
    isActive: {
        type: String,
        enum: ["Active", "pending", "hold"],
        default: "Active",
    }
})

const Student = mongoose.model("Student", studentSchema);

export default Student;