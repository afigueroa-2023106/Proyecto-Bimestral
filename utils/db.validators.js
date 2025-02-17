import User from '../src/usuarios/usuarios.model.js'
export const existUsername = async (username, user, id)=>{
    const alreadyUsername =  await User.findOne({username})
    if(alreadyUsername && !alreadyUsername._id != user._id){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}
 
export const existEmail = async (email, user)=>{
    const alreadyEmail =  await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id !=user._id){
        console.error(`Username ${email} is already taken`)
        throw new Error(`Username ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`);
    }
}