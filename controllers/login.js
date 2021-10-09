const Client = require('../models/Client')
const Marketer = require('../models/Marketer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


//process client's login details
exports.process_client_login = (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        return res.json({ msg: 'Please fill all fields'})
    }

    Client.findOne({ username })
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist!'})
        
        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch  => {
            if(!isMatch) return res.status(400).json({ msg: 'Password incorrect!'})

            jwt.sign(
                {id: user.id},
                process.env.SECRET_KEY,
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err;
                    return res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email  
                        },
                        msg: `Successfully Logged In`
                    })
                }
            )
        })
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
}

//process marketer's login
exports.process_marketer_login = (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        return res.json({ msg: 'Please fill all fields'})
    }

    Marketer.findOne({username})
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist!'})
        
        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch  => {
            if(!isMatch) return res.status(400).json({ msg: 'Password Incorrect!'})

            jwt.sign(
                {id: user.id},
                process.env.SECRET_KEY,
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err;
                    return res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email  
                        },
                        msg: `Successfully Logged In`
                    })
                }
            )
        })
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
}