

import express from "express"
import httpError from "../middleware/httpError.js";

import userModel from "../model/userModel.js";

const add = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        const newUser = new userModel({
            name, email, password
        });

        await newUser.save();

        res.status(201).json({ sccess: true, message: "new user add successfully", newUser })

    } catch (error) {
        next(new httpError(error.message, 500))
    }

}


const getAll = async (req, res, next) => {

    try {

        const userDetail = await userModel.find();

        if (userDetail.length === 0) {
            return next(new httpError("use data is not found", 404))
        }

        res.status(200).json({ success: true, message: "user data is found", total: userDetail.length, userDetail });

    } catch (error) {
        next(new httpError(error.message));
    }
};



const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const users = await userModel.findByCredential(email, password);


        const token = await users.generateAuthToken();

        if (!users) {
            return next(new httpError("unabel ro login", 400));
        }
        res.status(200).json({
            success: true,
            message: "user login successful",
            user: users,
            token
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
}



const authLogin = async function (req, res, next) {
    try {
        const user = req.user;

        if (!user) {
            return next(new httpError("unableto login", 401));
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        next(new httpError(error.message));
    }
}




const authDelete = async function (req, res, next) {
    try {

        const user = req.user

        await user.deleteOne()

        res.status(200).json({ success: true, message: "user data delete successfully" });

    } catch (error) {
        next(new httpError(error.message));
    }
}



const AuthUpdate = async function (req, res, next) {

    try {
        console.log("BODY:", req.body);
        const user = req.user;
        const AllowedFields = ["name", "password"];
        const updates = Object.keys(req.body);


        const isValidUpdate = updates.every((field) =>
            AllowedFields.includes(field)
        );

        if (!isValidUpdate) {
            return next(new httpError("Only name and password can be updated", 400))
        }

        updates.forEach((field) => {
            user[field] = req.body[field];
        })

        console.log("isValidUpdate :- ", updates)


        await user.save();

        res.status(200).json({ success: true, message: "update successfully", user })

    } catch (error) {

        return next(new httpError(error.message, 500))
    }
};



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



const AllLogOut = async function (req, res, next) {

    try {

        req.user.tokens = []

        await req.user.save()

        res.status(200).json({ success: true, message: "User logged out from all devices successfully" });

    } catch (error) {
        next(new httpError(error.message, 500))
    }

}
export default { add, getAll, login, authLogin, authDelete, AuthUpdate, logOut, AllLogOut }