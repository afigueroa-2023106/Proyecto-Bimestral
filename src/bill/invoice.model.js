import { Schema, model } from 'mongoose'

const invoiceSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User ',
            required: true
        },
        products: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productName: {
                type: String,
                required: true 
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            }
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
            default: 'PENDING'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

invoiceSchema.methods.toJSON = function() {
    const { __v, ...invoice } = this.toObject()
    return invoice
}

export default model('Invoice', invoiceSchema)