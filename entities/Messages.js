import mongoose from "mongoose";

const Messages = new mongoose.Schema({
    dialog: {type: String, required: true},
    sender: {type: String, required: true},
    senderName: {type: String, required: true},
    receiver: {type: String, required: true},
    receiverName: {type: String, required: true},
    text: {type: String, required: true, maxLength: 1000}
}, {timestamps: true})

export default mongoose.model('Messages', Messages)