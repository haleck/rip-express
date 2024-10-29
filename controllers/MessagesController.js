import Messages from "../entities/Messages.js";
import Dialogs from "../entities/Dialogs.js";
import jwt from "jsonwebtoken";

class MessagesController {
    async create(req, res){
        try {
            const {dialog, sender, senderName, receiver, receiverName, text, token} = req.body

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (decodedToken._id !== sender) return res.status(400).json("У вас нет прав для обновления чужого диалога")
            else {
                const message = await Messages.create({dialog, sender, senderName, receiver, receiverName, text})
                await Dialogs.updateOne({_id: dialog}, {lastMessage: text, lastMessageAuthor: sender})
                res.json(message)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByDialogId(req, res){
        try {
            const {id} = req.params
            const token = req.headers.token
            const messages = await Messages.find({dialog: id})

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (messages.length > 0 && decodedToken._id !== messages[0].sender && decodedToken._id !== messages[0].receiver){
                return res.status(400).json(messages)
            } else {
                res.json(messages)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new MessagesController()