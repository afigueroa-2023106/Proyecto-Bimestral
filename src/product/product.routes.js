import { Router } from "express"
import { bestSellers, deleteProduct, getAll, getProduct, getProductsByCategory, saveProduct, searchProductsByName, stockProduct, updateProduct } from "./product.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { productValidator, updateProductValidator } from "../../middlewares/validators.js"
import { objectIdValid } from "../../utils/db.validators.js"

const api = Router()
api.post(
    '/save', validateJwt, isAdmin,productValidator, saveProduct
)

api.get(
    '/get', validateJwt, getAll
)

api.get(
    '/get/:id', validateJwt, getProduct
)

api.put(
    '/update/:id',validateJwt, isAdmin, objectIdValid,updateProductValidator, updateProduct
)

api.get('/stockProduct',validateJwt, stockProduct)

api.get('/productos/categoria/:categoryName', validateJwt, getProductsByCategory)

api.get('/bestSellers',validateJwt, bestSellers)

api.delete('/:id',validateJwt, isAdmin,objectIdValid, deleteProduct)

api.get('/productos/buscar/:name', validateJwt, searchProductsByName)


export default api