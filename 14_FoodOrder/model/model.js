import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function () {

    const user = this;
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10)
    }
})

const User = mongoose.model("user", userSchema)

export default User;