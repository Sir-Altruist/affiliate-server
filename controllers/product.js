const mongoose = require('mongoose')
const Product = require('../models/Product')
const Client = require('../models/Client')

mongoose.Promise = global.Promise
exports.upload_product = async (req, res) => {
    const clientId = req.params.clientId
    const client = await Client.findById(clientId)
    if (!client){
        return res.status(404).json({ msg: "The Client does not exist" })
    }
    const { name, description, amount, commission, rating } = req.body
    if(!name || !description || !amount || !commission || !rating){
        return res.status(400).json({msg: 'Please fill all fields'})
    }
        
        const newProduct = new Product({
            name,
            description,
            amount,
            commission,
            rating,
            productImg: 'http://localhost:5000/' + req.file.path.replace(/\\/g, "/"),
            client: clientId
        })
        newProduct.save()
        .then(data => {
            res.status(200).json({
                message: 'Product added successfully',
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

//get all products
exports.get_all_products = (req, res) => {
    Product.find()
    .sort({ date: -1})
    .then(data => {
        if(data.length < 1){
            return res.json({msg: 'No product has been added yet'})
        }
        res.status(200).json(
             data.map(product => {
               return {
                _id: product._id,
                name: product.name,
                description: product.description,
                amount: product.amount,
                commission: product.commission,
                rating: product.rating,
                productImg: product.productImg,
                link: {
                    type: 'GET',
                    url: 'http://localhost:5000/products/' + product._id
                }
               }
            }) 
        )
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//get a single product
exports.get_single_product = (req, res) => {
    const id = req.params.productId
    Product.findById(id)
    .then(data => {
        if(data){
            res.status(200).json({
                message: 'Product fetched successfully',
                result: data
            })
        }else {
            res.status(404).json({
                message: "No valid entry found for provided ID"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//edit product
exports.edit_product = (req, res) => {
    const id = req.params.productId
    Product.findById(id)
    .then(product => {
        if(!product){
            res.status(404).json({
                message: `Product with the Id: ${id} cannot be found`
            })
        } else {
            product.name = req.body.name
            product.description = req.body.description
            product.amount = req.body.amount
            product.commission = req.body.commission
            product.rating = req.body.rating

            product.save()
            .then(data => {
                res.status(200).json({
                    message: 'Product details updated successfully',
                    result: data
                })
            })
            .catch(err => {
                res.status(500).json({
                     error: err
                })
            })
        }
    })
}

//delete product
exports.delete_product = (req, res) => {
    const id = req.params.productId
    Product.deleteOne({_id: id})
    .then(data => {
        res.status(200).json({
            message: 'Product deleted successfully',
            result: data
        })
    })
    .catch(err => {
        res.status(500).json({
             error: err
        })
    })
}