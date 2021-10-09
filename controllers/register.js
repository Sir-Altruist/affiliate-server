const Client = require('../models/Client')
const Marketer = require('../models/Marketer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

//process client's info
exports.process_client_info = (req, res) => {
    const { name, username, email, phone, country, password, confirm } = req.body
    if(!name || !username || !email || !phone || !country || !password || !confirm){
        return res.json({ msg: 'Please fill all fields'})
    }
    if(password != confirm){
        return res.json({msg: 'Passwords do not match'})
    }

    //checks if user already exist
    Client.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exist'})

        const newClient = new Client({
            name,
            username,
            email,
            phone,
            country,
            password
        })

        //create salt and hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newClient.password, salt, (err, hash) => {
                if(err) throw err
                newClient.password = hash
                newClient.save()
                .then(user =>  {
                    jwt.sign(
                        {id: user.id},
                        process.env.SECRET_KEY,
                        {expiresIn: 3600},
                        (err) => {
                            if(err) throw err;
                            return res.json({msg: 'Registeration Successful'})
                        }
                    )
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    })
                })
        })
            })
        })
    }

//process marketer's info
exports.process_marketer_info = (req, res) => {
    const { name, username, email, phone, country, password, confirm } = req.body
    if(!name || !username || !email || !phone || !country || !password || !confirm){
        return res.json({ msg: 'Please fill all fields'})
    }
    if(password != confirm){
        return res.json({msg: 'Passwords do not match'})
    }

    //Checks if user already exist
    Marketer.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'})
        
    const newMarketer = new Marketer({
        name,
        username,
        email,
        phone,
        country,
        password
    })

    //create salt and hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newMarketer.password, salt, (err, hash) => {
            newMarketer.password = hash
            newMarketer.save()
            .then(user =>  {
                jwt.sign(
                    {id: user.id},
                    process.env.SECRET_KEY,
                    {expiresIn: 3600},
                    (err) => {
                        if(err) throw err;
                        return res.json({msg: 'Registeration Successful'})
                    }
                )
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
        })

    })
    })

}