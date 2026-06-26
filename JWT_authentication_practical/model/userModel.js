import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ]
}, {
    timestamps: true
})

userSchema.pre("save", async function () {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

userSchema.statics.findByCredential = async function (email, password) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("Unable to Login");
        }

        const Matched = await bcrypt.compare(password, user.password);

        if (!Matched) {
            throw new Error("Unable to Login");
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

userSchema.methods.generateAuthToken = async function () {
    try {
        const user = this;

        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        if (!token) {
            throw new Error("failed to generate auth token");
        }

        user.tokens = user.tokens.concat({ token });

        await user.save();

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};



const User = mongoose.model("User", userSchema);

export default User;