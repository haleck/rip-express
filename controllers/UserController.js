import Users from "../entities/Users.js";
import bcrypt from 'bcrypt'
import validator from "validator";
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

class UserController {
    async register(req, res){
        try {
            let {email, password, name, surname} = req.body

            let user = await Users.findOne({email})

            if (user)
                return res.status(400).json(`User with email ${email} is already exists`)

            if (!email || !password || !name || !surname)
                return res.status(400).json("All fields are required")

            if (!validator.isEmail(email))
                return res.status(400).json("Email must be a valid email")

            if (!validator.isStrongPassword(password))
                return res.status(400).json("Password must be a strong password")

            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)

            user = await Users.create({email, password, name, surname})

            const token = createToken(user._id)

            return res.json({id: user.id, name: user.name, surname: user.surname, token})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getUserInfo(req,res) {
        try {
            const {id} = req.params
            if (!id) {
                return res.status(400).json({message: 'Id пользователя не указан'})
            }
            const user = await Users.findById(id)
            return res.json({name: user.name, surname: user.surname, status: user.status})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async login(req,res) {
        try {
            const {email, password} = req.body
            if (!email)
                return res.status(400).json({message: 'Email пользователя не указан'})

            const user = await Users.findOne({email: email})

            if (!user)
                return res.status(400).json("User doesn't exists")

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword)
                return res.status(400).json("Incorrect password")

            const token = createToken(user._id)

            return res.json({id: user.id, name: user.name, surname: user.surname, status: user.status, token})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async changeStatus(req, res) {
        try {
            const userId = req.body.id
            const newStatus = req.body.status
            if (!userId) {
                return res.status(400).json({message: 'Id пользователя не указан'})
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
                return res.status(400).json({message: 'Id пользователя не указан'})
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