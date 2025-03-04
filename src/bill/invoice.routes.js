import {Router} from "express"
import {  validateJwt } from "../../middlewares/validate.jwt.js"
import { completePurchase, editInvoice, getPurchaseHistory,  } from "./invoice.controller.js"


const api = Router()

api.post('/purchase', validateJwt, completePurchase)

api.get('/history',validateJwt, getPurchaseHistory);

api.put('/:id', validateJwt, editInvoice)


export default api