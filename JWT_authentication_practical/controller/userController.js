import User from "../model/userModel.js";

import HttpError from "../middleware/httpError.js";


//  add user

const addUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body

        const newUser = new User({ name, email, password })

        await newUser.save()

        res.status(201).json({ success: true, message: "new add add successfully", newUser })

    } catch (error) {
        throw next(new HttpError(error.message))
    }
}


//  all data find

const getAllUser = async (req, res, next) => {

    try {

        const users = await User.find();

        if (users.length === 0) {
            return next(new HttpError("no user data found", 404));
        }

        res.status(200).json({
            success: true,
            message: "all user data found successfully",
            users,
        });

    } catch (error) {

        return next(new HttpError(error.message, 500));
    }

};


// login

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByCredential(email, password);

        if (!user) {
            throw next(new HttpError("unable to login", 400));
        }

        const token = await user.generateAuthToken();


        res.status(200).json({
            success: true,
            message: "user login successfully",
            user,
            token,
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
}


//  auth login 

const authLogin = async function (req, res, next) {
    try {
        const user = req.user;

        if (!user) {
            return next(new HttpError("unable to login", 401));
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        throw next(new HttpError(error.message));
    }
}


// Auth delete

const authDelete = async function (req, res, next) {
    try {

        const user = req.user

        await user.deleteOne()

        res.status(200).json({ success: true, message: "user data delete successfully" });

    } catch (error) {
        next(new httpError(error.message));
    }
}


//  logOut

const logOut = async function (req, res, next) {

    try {

        const user = req.user;

        user.tokens = user.tokens.filter((t) => { t.token != req.token });

        await user.save()

        res.status(200).json({ success: true, message: "user is log out successfully" });

    } catch (error) {
        next(new httpError(error.message, 500))
    }
}


//  AllLogOut

const AllLogOut = async function (req, res, next) {

    try {

        req.user.tokens = []

        await req.user.save()

        res.status(200).json({ success: true, message: "User logged out from all devices successfully" });

    } catch (error) {
        next(new httpError(error.message, 500))
    }

}


// update

const updateUser = async (req, res, next) => {
    try {

        const user = req.user;

        const updates = Object.keys(req.body);

        const allowedField = ["name", "password"];

        const isValidUpdates = updates.every((field) =>
            allowedField.includes(field),
        )

        if (!isValidUpdates) {
            return next(new httpError("only allowed field acn be update", 400));
        }

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();

        res.status(200).json({ success: true, message: "user data updated successfully", user });

    } catch (error) {
        return next(new HttpError(error.message, 500));

    }
}

export default { addUser, getAllUser, login, authLogin, authDelete, logOut, AllLogOut, updateUser }