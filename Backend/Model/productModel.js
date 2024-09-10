const mongoose = require('mongoose')
const { ObjectId } =mongoose.Schema;

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true,
        trim: true
    },
    productRating: {
        type: String,
        required: true,
        default: 1
    },
    productCategory: {
        type: ObjectId,
        ref: 'CategoryModel',
        required: true
    },
    totalProduct: {
        type: Number,
        default: 0
    },
    productImage: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema)
    