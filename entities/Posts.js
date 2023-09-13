import mongoose from "mongoose";

const Posts = new mongoose.Schema({
    author: {type: String, required: true},
    authorName: {type: String, required: true},
    content: {type: String, required: true, maxLength: 1000}
}, {timestamps: true})

export default mongoose.model('Posts', Posts)