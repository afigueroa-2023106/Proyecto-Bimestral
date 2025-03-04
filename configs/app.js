import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

import userRouter from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import cartRoutes from '../src/cart/cart.routes.js'
import invoiceRoutes from '../src/bill/invoice.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/product', productRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/user', userRouter)
    app.use('/v1',authRoutes)
    app.use('/v1/cart', cartRoutes)
    app.use('/v1/invoice', invoiceRoutes)
}



export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`);
    } catch (error) {
        console.error(`Server init failed`,error);
        
    }
}