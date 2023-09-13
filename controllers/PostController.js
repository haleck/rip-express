import Posts from '../entities/Posts.js'

class PostController {
    async create(req,res) {
        try {
            const {author, authorName, content} = req.body
            const post = await Posts.create({author, authorName, content})
            res.json(post)
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
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id поста не указан'})
            }
            const post = await Posts.findByIdAndDelete(id)
            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController()