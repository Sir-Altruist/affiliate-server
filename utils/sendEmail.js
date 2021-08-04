const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv').config()


//google oauth
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


const sendEmail = async (email, subject, text) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken() 
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken
            }
        })

        const result = await transport.sendMail({
            from: process.env.USER,
            to: email,
            subject,
            text
        })
        if(result){
            return res.status(200).json({msg: result})
        } else {
            return res.status(400).json({msg: 'Email not sent...'})
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = sendEmail;