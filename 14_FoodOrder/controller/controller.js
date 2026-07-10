
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

        res.status(200).json({ success: true, message: "user data found successfully", total: userData.length, userData })

    } catch (error) {

        return next(new HttpError(error.message))

    }

}

// delete

const deleteAllUsers = async (req, res, next) => {
    try {

        const result = await User.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All users deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        return next(new HttpError(error.message));
    }
};

// login user 

const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);


        if (!user) {
            return next(new HttpError("unable to login", 404))
        }

        const token = await user.generateAuthToken()

        res.status(200).json({ success: true, message: "login successfully", user, token })

    } catch (error) {
        return next(new HttpError(error.message))
    }

}

const authLogin = async function (req, res, next) {
    try {
        const user = req.user;

        if (!user) {
            return next(new httpError("unable to login", 401));
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        next(new httpError(error.message));
    }
}

export default { add, AllUser, login, deleteAllUsers, authLogin }