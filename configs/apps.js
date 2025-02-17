'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'
import categoriaRoutes from '../src/categorías/categorias.routes.js' 
import productosRoutes from '../src/productos/productos.routes.js'
import usuarioRoutes from '../src/usuarios/usuarios.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(morgan('dev'))

}

const routes = (app)=>{
    app.use('/v2/categoria', categoriaRoutes)
    app.use('/v2/productos', productosRoutes)
    app.use('/v2/usuarios', usuarioRoutes)
    
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}