const Client = require('../models/Client')
const Marketer = require('../models/Marketer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const sendEmail = require('../utils/sendEmail')

//Submit client's request
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if(!email){
            return res.json({msg: 'This field cannot be empty'})
        }
        const user = await Client.findOne({email})
        if(!user){
            return res.status(404).json({msg: 'User does not exist'})
        }
    
        //process existing user
        const secret = process.env.SECRET_KEY + user.password
        const payload = {
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(payload, secret, {expiresIn: '15m'})
        const link = process.env.NODE_ENV === 'production' 
        ? `${process.env.NODE_ENV}/password-reset/${user._id}/${token}`
        : `http://localhost:5000/password-reset/${user._id}/${token}`
        console.log(link)
        await sendEmail(user.email, 'Password reset', link)
        console.log('Password reset link sent to your account')
    } catch (error) {
        res.json(error)
    }
}