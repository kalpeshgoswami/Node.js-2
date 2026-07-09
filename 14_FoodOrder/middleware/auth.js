import User from "../model/model.js";
import HttpError from "./httpError.js";

const auth = async (req, res, next) => {

    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            next(new HttpError("auth header is required", 400))
        }

        const token = authHeader.replace("Bearer ", "")

        const decode = jwt.verify(token, process.env, JWT_SECRET);

        const user = await User.findOne({
            _id: decode._id,
            "tokens.token": token,
        });

        if (!user) {
            next(new HttpError("unauthorize access", 401));
        }

        req.user = user;
        req.token = token;

        next()

    } catch (error) {
        next(new HttpError("authentication failed", 500))
    }
}

export default auth;