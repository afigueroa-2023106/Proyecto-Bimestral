import { Router } from 'express'
import { 
    getAll,
    getUserid,
    deleteUser,
    update,
    updatePassword,
    login,
    register, 
    test 
} from './usuarios.controller.js'  
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/login', login)
api.post('/register', register)
api.get('/test',[validateJwt],  test)
api.get('/',[validateJwt], getAll)
api.get('/:id',[validateJwt], getUserid)
api.delete('/:id',[validateJwt], deleteUser)
api.put('/password/:id',[validateJwt], updatePassword)
api.put('/:id', [validateJwt], update)

export default api
