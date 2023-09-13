import Users from "../entities/Users.js";

class UserController {
    async register(req, res){
        try {
            const {email, password, name, surname} = req.body
            const user = await Users.create({email, password, name, surname})
            res.json({id: user.id, name: user.name, surname: user.surname})
        } catch (e) {
            if (e.code === 1100) {
                res.status(400).json({...e, message: "User with this email is already exists"})
            }
            else {
                res.status(500).json(e)
            }
        }
    }

    async getUserInfo(req,res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id пользователя не указан'})
            }
            const user = await Users.findById(id)
            return res.json({name: user.name, surname: user.surname, status: user.status})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async login(req,res) {
        try {
            const {email} = req.params
            if (!email) {
                res.status(400).json({message: 'Email пользователя не указан'})
            }
            const user = await Users.findOne({email: email})
            return res.json({id: user.id, name: user.name, surname: user.surname, status: user.status})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async changeStatus(req, res) {
        try {
            const userId = req.body.id
            const newStatus = req.body.status
            if (!userId) {
                res.status(400).json({message: 'Id пользователя не указан'})
            }
            await Users.updateOne({_id: userId}, {status: newStatus})
            return res.json({id: userId, status: newStatus})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async checkUserExists(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id пользователя не указан'})
            }
            try {
                await Users.findById(id)
            } catch (e) {
                return res.json(false)
            }
            return res.json(true)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()