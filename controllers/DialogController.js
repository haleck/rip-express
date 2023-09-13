import Dialogs from '../entities/Dialogs.js'

class DialogController {
    async create(req, res) {
        try {
            const {firstUser, firstUserName, secondUser, secondUserName} = req.body
            const existsDialog = await Dialogs.findOne({firstUser, secondUser})
            if (existsDialog) {
                res.json(existsDialog)
            }
            else {
                const dialog = await Dialogs.create({firstUser, firstUserName, secondUser, secondUserName})
                res.json(dialog)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllUsersDialogs(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id пользователя не указан'})
            }
            const usersDialogs = await Dialogs.find({firstUser: id})
            const dialogsWithUser = await Dialogs.find({secondUser: id})
            const dialogs = [...usersDialogs, ...dialogsWithUser]

            return res.json(dialogs)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateLastMessage(req, res) {
        try {
            const dialogId = req.body.id
            const dialogLastMessage = req.body.lastMessage
            const dialogLastMessageAuthor = req.body.lastMessageAuthor

            if (!dialogId) {
                res.status(400).json({message: 'Id диалога не указан'})
            }
            await Dialogs.updateOne({_id: dialogId}, {lastMessage: dialogLastMessage, lastMessageAuthor: dialogLastMessageAuthor})
            return res.json({lastMessage: dialogLastMessage, lastMessageAuthor: dialogLastMessageAuthor})
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new DialogController()