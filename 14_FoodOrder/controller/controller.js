import HttpError from "../middleware/httpError.js";
import User from "../model/model.js";

const add = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        const newUser = new User({ name, email, password });

        await newUser.save();

        res.status(201).json({ success: true, message: "user data successfully added",newUser })

    } catch (error) {
        throw next(new HttpError(error.message))
    }
}

export default { add };