import mongoose from "mongoose";

const Dialogs = new mongoose.Schema({
    firstUser: {type: String, required: true},
    firstUserName: {type: String, required: true},
    secondUser: {type: String, required: true},
    secondUserName: {type: String, required: true},
    lastMessage: {type: String, required: false, maxLength: 1000},
    lastMessageAuthor: {type: String, required: false}
}, {timestamps: true})

export default mongoose.model('Dialogs', Dialogs)