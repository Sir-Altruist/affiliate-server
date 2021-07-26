const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')
const Marketer = require('../models/Marketer')

mongoose.Promise = global.Promise

//create orders
exports.create_orders = async (req, res) => {
    const requestedId = req.params.marketerId
    const productId = req.body.productId

    const newOrder = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        products: productId,
        marketer: requestedId
    })
    
    newOrder.save()
        .then(order => {
            console.log("order", order)
        })

    Marketer.findOne({_id: requestedId})
    .exec()
    .then(marketer => {
        if(marketer.order){
            marketer.order.push(newOrder._id)
            marketer.save()
                .then(response => 
                    res.status(200).json({ 
                        status: true,
                        data: response
                     })
                    )
        }
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
}
    
    
//get all orders
exports.get_all_orders = (req, res) => {
    Order.find()
    .sort({ date: -1})
    .populate('product', 'name')
    .then(data => {
        if(data.length < 1){
            return res.json({msg: 'No order has been made yet'})
        }
        res.status(200).json({
            count: data.length,
            result: data.map(order => {
                return {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    link: {
                    type: 'GET',
                    url: 'http://localhost:5000/order/' + order._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//get a single order
exports.get_single_order = (req, res) => {
    const id = req.params.orderId
    Order.findById(id)
    .populate('product', 'name description amount')
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: 'Order Not Found!'
            })
        }
        res.status(200).json(order)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//edit order
exports.edit_order = (req, res) => {
    const id = req.params.orderId
    Order.findById(id)
    .then(single => {
        if(!single){
            res.status(404).json({
                message: `Order with the Id: ${id} cannot be found`
            })
        }else {
            single.quantity = req.body.quantity
        }

        single.save()
        .then(data => {
            res.status(200).json({
                message: 'Order updated successfully',
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                 error: err
            })
        })
    })
}

//delete order
exports.delete_order = (req, res) => {
    const id = req.params.orderId
    Order.remove({_id: id})
    .then(success => {
        res.status(200).json({
            message: 'Order deleted successfully',
            success
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}