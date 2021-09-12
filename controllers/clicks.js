const Click = require('../models/Click');
const Product = require('../models/Product');


exports.addClick = async (req, res) => {
    try {
        
            const clicks = new Click({})
            const success = await clicks.save()
            if(success){
                return res.status(200).json({msg: 'Click saved to database successfully!'})
            }else {
                return res.status(400).json({msg: 'Click is not saved to database!'})
            }

    } catch(error){
       console.log(error)
    }
}

exports.getClick = async (req, res) => {
    try {

        const clickTotal = await Click.find()
        if(clickTotal){
            return res.status(200).json(clickTotal.length)
        } 
    } catch (error) {
        console.log(error)
    }
}