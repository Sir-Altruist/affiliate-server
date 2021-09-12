const mongoose = require('mongoose')
const Product = require('../models/Product')
const Client = require('../models/Client')
const dotenv = require('dotenv').config()


mongoose.Promise = global.Promise
exports.upload_product = async (req, res) => {
    const clientId = req.user.id
    const client = await Client.findById(clientId)
    if (!client){
        return res.status(404).json({ msg: "The Client does not exist" })
    }
    const { name, amount, budget, commission, rating, productImg, link, description } = req.body
    if(!name || !amount || !budget || !commission || !rating || !productImg || !link || !description){
        return res.status(400).json({msg: 'Please fill all fields'})
    }
        
        const newProduct = new Product({
            name,
            amount,
            budget,
            commission,
            rating,
            productImg,
            link,
            description,
            client: clientId
        })
        newProduct.save()
        .then(data => {
            return res.status(200).json({
                message: 'Product added successfully'
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}

//get products uploaded by a specific user
exports.get_user_products = async (req, res) => {
    try {
        const clientId = req.user.id
        const products = await Product.find({"client" : clientId }).sort({ date: -1})
        if(!products){
            console.log(products)
            return res.status(404).json({msg: 'This user does not exist!'})
        }
        if(products.length < 1){
            return res.status(200).json({msg: 'You are yet to upload any product!'}) 
        } else {
            return res.status(200).json(products)
        } 
    } catch (error) {
        console.log(error)
    }
}

//get all products
exports.get_all_products = (req, res) => {
    Product.find()
    .sort({ date: -1})
    .then(data => {
        if(data.length < 1){
            return res.status(200).json({ message: 'No product has been uploaded yet!'})
        }
        return res.status(200).json(data)
    })
    .catch(err => {
        return res.status(500).json({
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
            return res.status(200).json(data)
        }else {
            return res.status(404).json({
                msg: "No valid entry found for provided ID"
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
}

//edit product
exports.edit_product = (req, res) => {
    const id = req.params.productId
    const { name, amount, budget, commission, rating, productImg, link, description } = req.body
    if(!name || !amount || !budget || !commission || !rating || !productImg || !link || !description){
        return res.status(400).json({msg: 'Please fill all fields'})
    }
    Product.findById(id)
    .then(product => {
        if(!product){
            return res.status(404).json({
                msg: `Product with the provided Id cannot be found`
            })
        } else {
            product.name = name
            product.amount = amount
            product.budget = budget
            product.commission = commission
            product.rating = rating
            product.productImg = productImg
            product.link = link
            product.description = description

            product.save()
            .then(data => {
                return res.status(200).json({message: 'Product details updated successfully'})
            })
            .catch(err => {
                return res.status(500).json({
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
        return res.status(200).json({msg: 'Product deleted successfully'})
    })
    .catch(err => {
        return res.status(500).json({
             error: err
        })
    })
}