import { Router } from 'express'
import { 
    getAllCategorias,
    createCategoria,
    getCategoriaById,
    deleteCategoria,
    updateCategoria
} from './categorias.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()


api.get('/',[validateJwt], getAllCategorias)
api.post('/',[validateJwt], createCategoria)
api.get('/:id',[validateJwt], getCategoriaById)
api.delete('/:id',[validateJwt], deleteCategoria)
api.put('/:id',[validateJwt], updateCategoria)


export default api