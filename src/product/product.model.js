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
            min: [0, 'Price cannot be negative']  // Evita precios negativos
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
            min: [0, 'Stock cannot be negative']  // Hace que el stock no sea negativo
        },
        sales: {
            type: Number,
            default: 0,
            min: [0, 'Sales cannot be negative']  // Hace que las ventas no sean negativas
        },
        category: {
             type: Schema.Types.ObjectId,
             ref: 'Category',
             required: [true, 'Category ID is required']
        },
        // user:{
        //      type:Schema.Types.ObjectId,
        //      ref:'User',
        //     required:[ true, 'User ID is required']
        //  }
    },
    {
        versionKey: false, // Deshabilitar el __v (Versión del documento)
        timestamps: true // Agrega propiedades de fecha (Fecha de creación y de última actualización)
    }
)

productSchema.methods.toJSON = function() {
    const { __v, ...product } = this.toObject()  // Convierte un documento de MongoDB a Objeto de JS
    return product
}

export default model('Product', productSchema)
