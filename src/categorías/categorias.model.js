import mongoose, { Schema, model} from "mongoose"

const categoriaSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characteres`]
        },
        description:{
            type: String,
            required: [true, 'Description is required'],
            maxLength: [50, `Can't be overcome 50 characteres`]
        }
    }
)
export default model('Categoria', categoriaSchema)