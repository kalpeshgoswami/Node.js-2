import mongoose, { Types } from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },


    GRid: {
        type: Number,
        required: true,
        unique: true,
    },  


    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    course: {
        type: String,
        required: true,
        enum: [
            "Fullstack Developer",
            "Graphic Design",
            "Video Editing",
            "UI/UX",
        ]
    },
    
    PhoneNumber: {
        type: Number,
        required: true,
    },

})

const Student = mongoose.model("studentData", studentSchema);

export default Student;