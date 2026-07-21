import Joi from "joi"

export const userSchema = Joi.object({

    name: Joi.string().trim().min(2).max(50).required().trim().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must not exceed 50 characters",
        "any.required": "Name is required",
    }),

    email: Joi.string().trim().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Please enter a valid email address",
        "any.required": "Password is required"
    }),

    phone: Joi.string().trim().required()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
            "string.base": "Phone number must be a string",
            "string.pattern.base": "Phone number must be exactly 10 digits",
            "any.required": "Phone number is required",
        }),

    password: Joi.string().min(6).max(30).required().messages({
        "string.base": "password must be in string",
        "string.min": "password must be atleast 6 character long",
        "string.max": "password can be max upto 30 character long",
        "any.required": "password is required",
    }),

    address: Joi.string()
        .trim()
        .min(5)
        .max(100)
        .required()
        .messages({
            "string.base": "Address must be a string",
            "string.empty": "Address is required",
            "string.min": "Address must be at least 5 characters long",
            "string.max": "Address must not exceed 100 characters",
            "any.required": "Address is required",
        }),

    role: Joi.string()
        .valid("customer", "admin")
        .default("customer")
})

export const UpdateUserSchema = userSchema
    .fork(["name", "password", "phone", "address"], (field) => field.optional())
    .fork(["email", "role"], (field) => field.forbidden())
    .or("name", "password", "phone", "address")
    .messages({
        "object.missing": "Name, password, Phone and address any one required to update"
    });