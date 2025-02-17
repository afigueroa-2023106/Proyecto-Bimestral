import mongoose, { Schema, model } from "mongoose"

const productosSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [50, `Can't be overcome 50 characters`]
        },
        price: {
            type: String,
            enum: ['low', 'medium', 'high'],
            required: [true, 'Price is required'],
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria',
        }
    }
)

export default model('Productos', productosSchema);

