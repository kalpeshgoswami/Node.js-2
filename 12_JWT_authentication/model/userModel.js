import mongoose from "mongoose";
import JWT from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            trim: true,
            required: true,
            validation: (value) => {
                if (value.toLowerCase() === "password") {
                    throw new Error("password can't set as a password word")
                }
            }
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true },

);



userSchema.pre("save", async function () {

    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})



userSchema.statics.findByCredential = async function (email, password) {

    try {

        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("unable to login");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("unable to login");
        }

        return user;

    } catch (error) {

        throw new Error(error.message);

    }

};



userSchema.methods.generateAuthToken = async function () {

    try {

        const user = this;

        console.log("JWT_SECRET : ", process.env.JWT_SECRET);

        const token = JWT.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        )

        console.log("Generated token :", token);

        if (!token) {

            throw new error("failed to generate token");

        };

        user.tokens = user.tokens.concat({ token });

        await user.save();

        return token

    } catch (error) {
        throw new Error(error.message)
    }
}

userSchema.method.toJSON = function () {

    const user = this;

    const userObject = user.toObject();

    delete userObject.password;

    delete userObject.tokens;

    delete userObject.__v

    return userObject

}

const userModel = mongoose.model("user", userSchema);

export default userModel; 