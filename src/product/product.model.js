import mongoose from "mongoose"
import { Schema, model } from 'mongoose'

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [8, 'Description must be at least 8 characters long'], 
            maxLength: [100, 'Description must be at most 100 characters long']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
            min: [0, 'Stock cannot be negative']
        },
        sales: {
            type: Number,
            default: 0,
            min: [0, 'Sales cannot be negative']
        },
        category: {
             type: Schema.Types.ObjectId,
             ref: 'Category',
             required: [true, 'Category ID is required']
        },
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

productSchema.methods.toJSON = function() {
    const { __v, ...product } = this.toObject()
    return product
}

export default model('Product', productSchema)
