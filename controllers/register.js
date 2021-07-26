const Client = require('../models/Client')
const Marketer = require('../models/Marketer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

//process client's info
exports.process_client_info = (req, res) => {
    const { username, email, password, confirm } = req.body
    if(!username || !email || !password || !confirm){
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
            username,
            email,
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
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        })
            })
        })
    }

//process marketer's info
exports.process_marketer_info = (req, res) => {
    const { name, email, website, category, password, confirm } = req.body
    if(!name || !email || !category || !password || !confirm){
        return res.json({ msg: 'All fields are required except website field only'})
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
        email,
        website,
        category,
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
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                website: user.website,
                                category: user.category 
                            }
                        })
                    }
                )
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })

    })
    })

}