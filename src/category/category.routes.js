import {Router} from "express"
import {categoryDelete, getAll, getCategory, saveCategory, updateCategory } from "./category.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { categoryValidator, updateCategoryValidator } from "../../middlewares/validators.js"

const api = Router()

api.post(
    '/save',validateJwt, isAdmin,categoryValidator, saveCategory
)

api.get(
    '/get/:id',validateJwt, isAdmin, getCategory
)

api.get(
    '/getAll',validateJwt, getAll
)

api.put(
    '/:id', validateJwt, isAdmin, updateCategoryValidator, updateCategory
)

api.delete(
    '/:id', validateJwt, isAdmin, categoryDelete
)
export default api