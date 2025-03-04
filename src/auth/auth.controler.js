import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async(req, res)=>{
    try{    
    
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
      
        await user.save()
        return res.send({message: `Registered successfully, can be login with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}

export const login = async(req, res)=>{
    try{
       
        let { userLoggin, password } = req.body
        
        let user = await User.findOne(
            {
                $or: [ 
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) 
        console.log(user)
        
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.user
        const { currentPassword, newPassword } = req.body

        const user = await User.findById(uid)
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User  not found'
                }
            )
        }

        const isMatch = await checkPassword(user.password, currentPassword)
        if (!isMatch) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Current password is incorrect'
                }
            )
        }

        user.password = await encrypt(newPassword)
        const updatedUser  = await user.save()

        return res.send(
            {
                success: true,
                message: 'Password updated successfully',
                user: updatedUser  
            }
        )
    } catch (e) {
        console.e(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with update password function',
                e
            }   
        )
    }
}

const agregarUsuarioPorDefecto = async () => {
    try {
        const adminExistente = await User.findOne({ role: "ADMIN" })

        if (!adminExistente) {
            const passwordHash = await encrypt("Admin1234", 10)

            const usuarioAdmin = new User({
                name: "Diego ",
                surname: "Chupina",
                username: "dchupina",
                email: "dchupina-2023120@kinal.edu.gt",
                phone: "41662867",
                password: passwordHash,
                role: "ADMIN",
            })

            await usuarioAdmin.save()
            console.log("Default admin user added")
        }
    } catch (error) {
        console.error("Error adding default user:", error)
    }
}

agregarUsuarioPorDefecto();

export const updateUser   = async (req, res) => {
    try {
        const { uid } = req.user
        const { currentPassword, ...data } = req.body

        if (!currentPassword) {
            return res.status(400).send({
                success: false,
                message: 'Current password is required'
            })
        }

        const user = await User.findById(uid)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User  not found'
            })
        }

        const isMatch = await checkPassword(user.password, currentPassword)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Current password is incorrect'
            })
        }

        delete data.role
        delete data.password

        const updatedUser   = await user.save()

        return res.send({
            success: true,
            message: 'User  updated successfully',
            user: updatedUser     
        })
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send({
            success: false,
            message: 'General error with update user function',
            error
        })
    }
}

export const deleteUser  = async (req, res) => {
    try {
        const { uid } = req.user
        const { password } = req.body 
        
        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Password is required to delete the account'
            })
        }

        const user = await User.findById(uid)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User  not found'
            })
        }

        const isMatch = await checkPassword(user.password, password)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Incorrect password'
            })
        }

        await User.findByIdAndDelete(uid)

        return res.send({
            success: true,
            message: 'User  account deleted successfully'
        })
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send({
            success: false,
            message: 'General error with delete user function',
            error
        })
    }
}