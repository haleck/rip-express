import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const DB_URL = process.env.ATLAS_URL

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)

async function startApp() {
    try {
        try {
            await mongoose.connect(DB_URL)
            console.log('MongoDB successfully connected')
        } catch (e) {
            console.log(e)
        }

        app.listen(PORT, ()=>console.log("Server started"))
    } catch (e) {
        console.log(e)
    }
}

startApp()
