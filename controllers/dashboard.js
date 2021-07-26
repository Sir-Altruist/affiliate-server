const Client = require('../models/Client')
const Marketer = require('../models/Marketer')

//client's dashboard
exports.dashboard_client = (req, res) => {
    Client.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
}

//marketer's dashboard
exports.dashboard_marketer = (req, res) => {
    Marketer.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
}