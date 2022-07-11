import { User } from "../model/Users.js"
import jwt from "jsonwebtoken"
import { sendMail } from "../middlewares/sendMail.js"
import cloudinary from "cloudinary"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password!",
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 10 * 60 * 2000),
                httpOnly: true,
            })
            .json({
                success: true,
                message: "Logged in Successfully",
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .json({
                success: true,
                message: "Logged out Successfully",
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne().select("-password -email")

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body
        const userMessage = `Hello, this is ${name}. My Email Id is ${email} and message is ${message}`

        await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateUser = async (req, res) => { 
    try {
        const user = await User.findById(req.user._id)

        const { name, email, password, skills, about } = req.body

        if (name) {
            user.name = name
        }

        if (email) {
            user.email = email
        }

        if (password) {
            user.password = password
        }

        if (skills) {
            if (skills.image1) {
                await cloudinary.v2.uploader.destroy(user.skills.image1.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
                    folder: "portfolio",
                })

                user.skills.image1 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if (skills.image2) {
                await cloudinary.v2.uploader.destroy(user.skills.image2.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
                    folder: "portfolio",
                })

                user.skills.image2 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if (skills.image3) {
                await cloudinary.v2.uploader.destroy(user.skills.image3.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
                    folder: "portfolio",
                })

                user.skills.image3 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if (skills.image4) {
                await cloudinary.v2.uploader.destroy(user.skills.image4.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
                    folder: "portfolio",
                })

                user.skills.image4 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if (skills.image5) {
                await cloudinary.v2.uploader.destroy(user.skills.image5.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
                    folder: "portfolio",
                })

                user.skills.image5 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if (skills.image6) {
                await cloudinary.v2.uploader.destroy(user.skills.image6.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
                    folder: "portfolio",
                })

                user.skills.image6 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
        }
        if (about) {
            // name: String,
            // title: String,
            // subtitle: String,
            // description: String,
            // quote: String,
            // avatar: {
            //     public_id: String,
            //     url: String,
            // },
            user.about.name = about.name
            user.about.title = about.title
            user.about.subtitle = about.subtitle
            user.about.description = about.description
            user.about.quote = about.quote

            if (about.avatar) {
                await cloudinary.v2.uploader.destroy(user.about.avatar.public_id)

                const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
                    folder: "portfolio",
                })

                user.about.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
        }
        await user.save()

        res.status(200).json({
            success: true,
            message: "User updated successfully",
        })

        // res.status(200).json({
        //     success: true,
        //     user,
        // })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const addTimeline = async (req, res) => {
    try {
        const { title, description, date } = req.body
        // const userMessage = `Hello, this is ${name}. My Email Id is ${email} and message is ${message}`
        const user = await User.findById(req.user._id)

        user.timeline.unshift({
            title,
            description,
            date,
        })

        await user.save()

        // await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your Timeline has been updated successfully.",
            // user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const addYoutube = async (req, res) => {
    try {
        const { url, title, image } = req.body

        const user = await User.findById(req.user._id)

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        })

        user.youtube.unshift({
            url,
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        })

        await user.save()

        // await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your Youtube video link has been updated successfully.",
            // user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const addProject = async (req, res) => {
    try {
        const { url, title, image, description, techStack } = req.body
        // const userMessage = `Hello, this is ${name}. My Email Id is ${email} and message is ${message}`
        const user = await User.findById(req.user._id)

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        })

        user.projects.unshift({
            url,
            title,
            description,
            techStack,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        })

        await user.save()

        // await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your Project has been updated successfully.",
            // user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteTimeline = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(req.user._id)
        user.timeline = user.timeline.filter((item) => item._id != id)

        await user.save()

        // await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your Timeline has been deleted successfully.",
            // user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteYoutube = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(req.user._id)
        const video = user.youtube.filter((video) => video._id == id)
        await cloudinary.v2.uploader.destroy(video.image.public_id)
        user.youtube = user.youtube.filter((video) => video._id != id)

        await user.save()

        // await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your Youtube Video has been deleted successfully.",
            // user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(req.user._id)
        const project = user.youtube.filter((project) => project._id == id)
        await cloudinary.v2.uploader.destroy(project.image.public_id)
        user.projects = user.youtube.filter((project) => project._id != id)

        await user.save()

        // await sendMail(userMessage)

        return res.status(200).json({
            success: true,
            message: "Your Project has been deleted successfully.",
            // user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
