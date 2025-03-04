import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [5, 'Description must be at least 5 characters long'], 
            maxLength: [100, 'Description must be at most 100 characters long']
        },
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

categorySchema.methods.toJSON = function() {
    const { __v, ...category } = this.toObject() 
    return category
}

export default model('Category', categorySchema)