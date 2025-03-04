import { Router } from "express"
import { 
    deleteUser,
    login,
    register,
    updatePassword,
    updateUser,  
} from "./auth.controler.js"
import { registerValidator, updatePasswordValidator, userUpdate } from "../../middlewares/validators.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"


const api = Router()

api.post(
    '/register', 
    registerValidator,
    register,

)

api.post('/login', login)

api.put(
    '/updatePassword',
    [
        validateJwt, 
        updatePasswordValidator
    ], 
    updatePassword
)

api.put('/updateUser', validateJwt, userUpdate,  updateUser)

api.delete('/deleteUser', validateJwt, deleteUser )
export default api