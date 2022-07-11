import express from "express"
import {
    login,
    logout,
    getUser,
    contact,
    updateUser,
    addTimeline,
    addProject,
    addYoutube,
    deleteTimeline,
    deleteYoutube,
    deleteProject,
} from "../controller/Users.js"
import { isAuthenticated } from "../middlewares/auth.js"
import { myProfile } from "../controller/Users.js"

// export const app = express()
export const userRouter = express.Router()
// import { userRouter } from "./routes/User.js"

// app.use("/api/v1", userRouter)

userRouter.route("/login").post(login)
userRouter.route("/logout").get(logout)

userRouter.route("/user").get(getUser)

userRouter.route("/me").get(isAuthenticated, myProfile)
userRouter.route("/admin/update").put(isAuthenticated, updateUser)
userRouter.route("/admin/timeline/add").post(isAuthenticated, addTimeline)
userRouter.route("/admin/youtube/add").post(isAuthenticated, addYoutube)
userRouter.route("/admin/project/add").post(isAuthenticated, addProject)

userRouter.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline)
userRouter.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube)
userRouter.route("/admin/project/:id").delete(isAuthenticated, deleteProject)


userRouter.route("/contact").post(contact)
