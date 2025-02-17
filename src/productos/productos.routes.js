import { Router } from 'express'    
import {
    getAllProductos,
    createProducto,
    getProductoById,
    deleteProducto,
    updateProducto
} from './productos.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/', [validateJwt], getAllProductos)
api.post('/', [validateJwt], createProducto)
api.get('/:id', [validateJwt], getProductoById)
api.delete('/:id', [validateJwt], deleteProducto)
api.put('/:id', [validateJwt], updateProducto)

export default api;
