import Dialogs from '../entities/Dialogs.js'
import Posts from "../entities/Posts.js";
import jwt from "jsonwebtoken";

class DialogController {
    async create(req, res) {
        try {
            const {firstUser, firstUserName, secondUser, secondUserName, token} = req.body

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (decodedToken._id !== firstUser) return res.status(400).json("У вас нет прав для создания диалога от имени другого пользователя")
            else {
                const existsDialog = await Dialogs.findOne({firstUser, secondUser})
                if (existsDialog) {
                    res.json(existsDialog)
                }
                else {
                    const dialog = await Dialogs.create({firstUser, firstUserName, secondUser, secondUserName})
                    res.json(dialog)
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllUsersDialogs(req, res) {
        try {
            const {id} = req.params
            const token = req.headers.token
            if (!id) {
                res.status(400).json({message: 'Id пользователя не указан'})
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (decodedToken._id !== id) return res.status(400).json("У вас нет прав для получения диалогов другого пользователя")
            else {
                const usersDialogs = await Dialogs.find({firstUser: id})
                const dialogsWithUser = await Dialogs.find({secondUser: id})
                const dialogs = [...usersDialogs, ...dialogsWithUser]

                return res.json(dialogs)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateLastMessage(req, res) {
        try {
            const dialogId = req.body.id
            const dialogLastMessage = req.body.lastMessage
            const dialogLastMessageAuthor = req.body.lastMessageAuthor
            const token = req.body.token

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (decodedToken._id !== dialogLastMessageAuthor) return res.status(400).json("У вас нет прав для обновления чужого диалога")
            else {
                if (!dialogId) {
                    res.status(400).json({message: 'Id диалога не указан'})
                }
                await Dialogs.updateOne({_id: dialogId}, {lastMessage: dialogLastMessage, lastMessageAuthor: dialogLastMessageAuthor})
                return res.json({lastMessage: dialogLastMessage, lastMessageAuthor: dialogLastMessageAuthor})
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new DialogController()