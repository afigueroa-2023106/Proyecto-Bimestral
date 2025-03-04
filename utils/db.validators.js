import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
import Product from '../src/product/product.model.js'
import Category from '../src/category/category.model.js'
import mongoose from 'mongoose'

export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email}) 
        if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}


export const objectIdValid = async (req, res, next) => {
    const { id } = req.params 
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({
            success: false,
            message: 'Invalid ObjectId format'
        })
    }
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).send({
            success: false,
            message: 'Product not found'
        })
    }

    next() 
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

export const validateObjectId  = (req, res, next) => {
    const { category } = req.body 
    if (!mongoose.isValidObjectId(category)) {
        return res.status(400).send({
            success: false,
            message: 'Keeper is not a valid ObjectId'
        })
    }
    next()
}

export const existProductName = async (name) => {
    const existingProduct = await Product.findOne({ name })
    if (existingProduct) {
        throw new Error('Product with this name already exists')
    }
    return true
}

export const isValidPrice = (value) => {
    if (value < 0) {
        throw new Error('Price cannot be negative')
    }
    return true
}

export const isValidStock = (value) => {
    if (value < 0) {
        throw new Error('Stock cannot be negative')
    }
    return true
}

export const isValidCategoryId = (categoryId) => {
    if (!mongoose.isValidObjectId(categoryId)) {
        throw new Error('El id de la categoria no es valida')
    }
    return true
}

export const existCategoryName = async (name) => {
    if (!name) {
        throw new Error('Category name is required')
    }

    const category = await Category.findOne({ name: name.trim() })

    if (category) {
        throw new Error('The category name already exists')
    }
}

export const existCategoryNameU = async (name, { req }) => {
    if (!name) return

    const category = await Category.findOne({ name: name.trim() })

    if (category && category._id.toString() !== req.params.id) {
        throw new Error('The category name already exists')
    }
}
