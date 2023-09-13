import Messages from "../entities/Messages.js";
import Dialogs from "../entities/Dialogs.js";

class MessagesController {
    async create(req, res){
        try {
            const {dialog, sender, senderName, receiver, receiverName, text} = req.body
            const message = await Messages.create({dialog, sender, senderName, receiver, receiverName, text})
            await Dialogs.updateOne({_id: dialog}, {lastMessage: text, lastMessageAuthor: sender})
            res.json(message)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByDialogId(req, res){
        try {
            const {id} = req.params
            const messages = await Messages.find({dialog: id})
            res.json(messages)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new MessagesController()