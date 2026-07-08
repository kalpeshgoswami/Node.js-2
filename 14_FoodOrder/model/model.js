// external model
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import httpError from "../middleware/httpError.js"

// mongoose Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (value.toLowerCase() === "password") {
                return "password can't be as a password"
            }
        }
    },

    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]


}, {
    timestamps: true
})

// hash password
userSchema.pre("save", async function () {

    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})

userSchema.statics.findByCredentials = async function (email, password) {

    try {

        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("unable to loggin")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("unable to loggin")
        }

        return user;

    } catch (error) {
        throw new Error(error.message)
    }

}


const User = mongoose.model("user", userSchema)

export default User;