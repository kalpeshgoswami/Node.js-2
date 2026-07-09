
// local module
import HttpError from "../middleware/httpError.js";
import User from "../model/model.js";

// add user
const add = async (req, res, next) => {

    try {

        const { name, email, password, address, phone } = req.body;

        const newUser = new User({ name, email, password, address, phone });

        await newUser.save();

        res.status(201).json({ success: true, message: "user data successfully added", newUser })

    } catch (error) {
        throw next(new HttpError(error.message))
    }
}

// get all user

const AllUser = async (req, res, next) => {

    try {

        const userData = await User.find();

        if (!userData === 0) {
            return next(new HttpError("User data is not found", 404))
        }

        res.status(200).json({ success: true, message: "user data found successfull", total: userData.length, userData })

    } catch (error) {

        return next(new HttpError(error.message))

    }

}

// loggin user 

const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);


        if (!user) {
            return next(new HttpError("unable to loggin", 404))
        }

        const token = await user.generateAuthToken()

        res.status(200).json({ success: true, message: "loggin successfully", user, token })

    } catch (error) {
        return next(new HttpError(error.message))
    }

}

export default { add, AllUser, login }