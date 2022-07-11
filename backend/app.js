import express from "express"
import cookieParser from "cookie-parser"
import path from "path"

export const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(cookieParser())

// export const app = express()
// export const userRoute = express.Router()
import { userRouter } from "./routes/Users.js"

app.use("/api/v1", userRouter)

app.use(express.static(path.resolve("./frontend/build")))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve("./frontend/build/index.html"))
})
