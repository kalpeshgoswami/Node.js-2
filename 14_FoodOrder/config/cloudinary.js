import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

import { v2 as cloudianry } from "cloudinary"

cloudianry.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudianry;