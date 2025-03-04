import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [{
            productId: { 
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productName: { 
                type: String
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            }
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
)

cartSchema.methods.toJSON = function() {
    const { __v, ...cart } = this.toObject();
    return cart;
}

export default model('Cart', cartSchema);
