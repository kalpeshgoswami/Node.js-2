// external module
import Joi from "joi";

export const restaurantSchema = Joi.object({
  restaurantName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.base": "Restaurant Name must be in string format",
      "string.min": "Restaurant Name must be at least 2 characters long",
      "string.max": "Restaurant Name must not exceed 50 characters",
      "any.required": "Restaurant Name is required",
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .trim()
    .required()
    .messages({
      "string.base": "Description must be in string format",
      "string.min": "Description must be at least 10 characters long",
      "string.max": "Description must not exceed 1000 characters",
      "any.required": "Description is required",
    }),

  address: Joi.string()
    .min(5)
    .max(200)
    .trim()
    .required()
    .messages({
      "string.base": "Address must be in string format",
      "string.min": "Address must be at least 5 characters long",
      "string.max": "Address must not exceed 200 characters",
      "any.required": "Address is required",
    }),

  state: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "State must be in string format",
      "any.required": "State is required",
    }),

  city: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "City must be in string format",
      "any.required": "City is required",
    }),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": "Phone must be in string format",
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian mobile number",
      "any.required": "Phone is required",
    }),

  openingTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "Opening Time must be in string format",
      "string.pattern.base": "Opening Time must be in HH:mm format (e.g. 09:30)",
      "any.required": "Opening Time is required",
    }),

  closingTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "Closing Time must be in string format",
      "string.pattern.base": "Closing Time must be in HH:mm format (e.g. 22:00)",
      "any.required": "Closing Time is required",
    }),

  rating: Joi.number()
    .min(0)
    .max(5)
    .default(0)
    .messages({
      "number.base": "Rating must be a number",
      "number.min": "Rating cannot be less than 0",
      "number.max": "Rating cannot be greater than 5",
    }),
});
