const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

function auth(req, res, next){
    const token = req.header('x-auth-token')

    //check for token header
    if(!token) res.status(401).json({ msg: 'No token, authorization denied!'})

    try {
        //verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        //Add user from payload
        req.user = decode;
        next()
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid! Please logout and login again'})
    }
}

module.exports = auth;