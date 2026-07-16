import httpError from "httpError.js"

const checkRole = (...Roles) => (req, res, next) => {

    try {

        if (!req.user) {
            return next(new httpError("please authenticate", 400))
        }

        if (!Roles.includes(req.user.Role)) {
            return next(new httpError("forbidden acceess denied", 403))
        }

        next()

    } catch (error) {
        return next(new httpError(error.message))
    }
}

export default checkRole;