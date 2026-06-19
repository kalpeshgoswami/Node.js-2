import mongoose from "mongoose";

async function connectDB(req, res, next) {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI)

        console.log("DB connected")

        return connect

    } catch (error) {
        throw new error(error.message)
    }

}

export default connectDB;