const jwt = require('jsonwebtoken')
const Order = require('../models/Order')
const dotenv = require('dotenv').config()

const confirm = (req, res, next) => {
    const token = req.header('x-auth-token')

     //check for token header
    if(!token) res.status(401).json({ msg: 'No token, authorization denied!'})
    try {
        //verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decode._id
        Order.findOne({_id: req.params.orderId, userId})
        .then(order => {
            if(order){
                next()
            }else {
                return res.status(404).json({msg: 'You are not authorized to perform this action!'})
            }
        })
    } catch(err) {
        return res.status(400).json({ msg: 'Token is not valid'})
    }
}

module.exports = confirm;