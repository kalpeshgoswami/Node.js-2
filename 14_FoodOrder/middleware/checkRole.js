import HttpError from "./httpError.js"

const checkRole = (...Roles) => (req, res, next) => {

    try {

        if (!req.user) {
            return next(new HttpError("please authenticate", 400))
        }

        if (!Roles.includes(req.user.Role)) {
            return next(new HttpError("forbidden acceess denied", 403))
        }

        next()

    } catch (error) {
        return next(new HttpError(error.message))
    }
}

export default checkRole;