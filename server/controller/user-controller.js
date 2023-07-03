import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/user.js';
import Token from '../model/token.js';

dotenv.config()

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] })

        if (existingUser) return res.status(400).json({ msg: 'User Already Exists with username/email' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save()
        return res.status(200).json({ msg: 'Signup successful' })

    } catch (error) {
        return res.status(500).json({ 'msg': `Error while signup : ${error.message}` })
    }

}

export const loginUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if (!user) return res.status(400).json({ 'msg': "User doesn't exists" })

    try {
        const match = await bcrypt.compare(req.body.password, user.password)

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({ token: refreshToken })
            await newToken.save()

            return res.status(200).json({ accessToken : accessToken, refreshToken : refreshToken , username : user.username})

        }else{
            return res.status(400).json({'msg' : "Password doesn't match"})
        }

    } catch (err) {
        return res.status(500).json('Error while logging in.')
    }
}