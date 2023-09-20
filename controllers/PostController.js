import Posts from '../entities/Posts.js'
import jwt from "jsonwebtoken";
import Users from "../entities/Users.js";

class PostController {
    async create(req,res) {
        try {
            const {author, authorName, content, token} = req.body
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (decodedToken._id !== author) return res.status(400).json("У вас нет прав для создания поста от этого пользователя")
            else {
                const post = await Posts.create({author, authorName, content})
                return res.json(post)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllUsersPosts(req,res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id пользователя не указан'})
            }
            const posts = await Posts.find({author: id})
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req,res) {
        try {
            const token = req.headers.token

            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id поста не указан'})
            }
            let post = await Posts.findById(id)

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (decodedToken._id !== post.author) return res.status(400).json("У вас нет прав для удаления поста чужого пользователя")
            else {
                console.log('here')
                if (!post) {
                    return res.status(404).json({ message: 'Пост не найден' });
                }
                Posts.deleteOne(post._id)
                return res.json(post)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController()