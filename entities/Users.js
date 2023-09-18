import mongoose from "mongoose";

const Users = new mongoose.Schema({
    email: {type: String, required: true, maxLength: 50, unique: true},
    password: {type: String, required: true, maxLength: 100},
    name: {type: String, required: true, maxLength: 15},
    surname: {type: String, required: true, maxLength: 15},
    status: {type: String, required: false, maxLength: 200}
})

export default mongoose.model('Users', Users)