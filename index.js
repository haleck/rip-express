import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import cors from 'cors'

const PORT = 5000
const PASSWORD = 'CksVzPDIQC9KWs6B'
const DB_URL = `mongodb+srv://zdiroog:${PASSWORD}@cluster0.qvbuxuu.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, ()=>console.log("Server started"))
    } catch (e) {
        console.log(e)
    }
}

startApp()
