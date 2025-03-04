import { Router } from "express"
import { 
    getAll, 
    get, 
    update,
} from "./user.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js"


const api = Router()

api.get(
    '/',
    validateJwt,
    isAdmin,
    getAll
)
api.get(
    '/:id', 
    validateJwt,
    get
)
api.put(
    '/updateUser', 
    [
        validateJwt, 
        updateUserValidator
    ], 
    update
)



export default api

