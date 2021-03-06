const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const dotenv = require('dotenv').config()


//google oauth
const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })



const sendEmail = async (email, subject, html, text) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken() 
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject,
            html,
            text     
        }
        const result = await transporter.sendMail(mailOptions)
        return result
    } catch (error) {
        console.log(error, 'email not sent')
        res.json(error)
    }
}

module.exports = sendEmail;