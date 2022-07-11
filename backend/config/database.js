// import mongoose from "mongoose"

// export const connectDatabase = () => {
//     mongoose
//         .connect(process.env.MONGO_URI)
//         .then((c) => {
//             console.log(`Mongodb connect to: ${c.connection.host}`)
//         })
//         .catch((e) => {
//             console.log(e)
//         })
// }

// const { MongoClient, ServerApiVersion } = require("mongodb")
// // const uri = "mongodb+srv://sushant:<password>@cluster0.ffr5y.mongodb.net/?retryWrites=true&w=majority";
// const uri = process.env.MONGO_URI
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
// })
// client.connect((err) => {
//     const collection = client.db("test").collection("devices")
//     // perform actions on the collection object
//     client.close()
// })

// import mongoose from "mongoose"

// const username = "sushant"
// const password = "iXl35pmXctIDeGwL"
// const cluster = "cluster0.ffr5y"
// const dbname = "myportfolio"

// export const connectDatabase = () => {
//     mongoose
//         .connect(process.env.MONGO_URI)
//         .then((c) => {
//             console.log(`MongoDB connect to: ${c.connection.host}`)
//         })
//         .catch((e) => {
//             console.log(e)
//         })
// }

// import mongoose from "mongoose"
// const express = require("express");
// const mongoose = require("mongoose");
// const Router = require("./routes")

// const app = express();

// app.use(express.json());

// import {connectDatabase} from './config/database.js'

// export const connectDatabase = () => {
//     mongoose.connect(`MONGO_URI`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
// }

// const db = mongoose.connection
// db.on("error", console.error.bind(console, "connection error: "))
// db.once("open", function () {
//     console.log("MongoDB Database Connected successfully")
// })
