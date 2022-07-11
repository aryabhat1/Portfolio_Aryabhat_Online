import { app } from "./app.js"
import dotenv from "dotenv"
// import { connectDatabase } from "./config/database.js"
import mongoose from "mongoose"

import cloudinary from 'cloudinary';

dotenv.config({ path: "./backend/config/config.env" })
// connectDatabase()

mongoose.connect(
    // `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function () {
    console.log("Connected successfully")
})

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINERY_NAME,
    api_key: process.env.CLOUDINERY_KEY,
    api_secret: process.env.CLOUDINERY_SECRET
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})
