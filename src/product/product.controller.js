import Product from './product.model.js'
import Category from '../category/category.model.js'


export const saveProduct = async (req, res) => {
    try {
        const data = req.body

        const newProduct = new Product(data)
        
        await newProduct.save()

        return res.send({
            success: true,
            message: 'Product saved successfully',
            product: newProduct
        })

    } catch (e) {
        console.error(e)
        return res.status(500).send({
            success: false,
            message: 'General error',
            error: e.message
        })
    }
}

export const getAll = async(req, res)=>{
    const{ limit, skip } = req.query
    try {
        const products = await Product.find()
            .populate(
                {
                    path: 'category',
                    select: 'name -_id'
                }
            )
            .skip(skip)
            .limit(limit)
        if(products.length === 0){
            return res.statis(404).send(
                {
                    success:false,
                    message: 'Products not fpund'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Products found:',
                total: products.length,
                products
            }
        )

    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding products',
                e
            }
        )
    }
}

export const getProduct = async (req, res) => {
    try {
        let { id } = req.params

        let product = await Product.findById(id)
            .populate(
                {
                path: 'category',
                select: 'name -_id'
                }
            )

       
        if (!product) {
            return res.status(404).send(
                {
                success: false,
                message: 'Product not found'
                }
            )
        }

        return res.send(
            {
            success: true,
            message: 'Product found',
            product
            }
        )

    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
            success: false,
            message: 'General error',
            error: e
            }
        )
    }
}


export const updateProduct = async(req, res)=>{
    try{
        const { id } = req.params

        const data = req.body

        const update = await Product.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Product updated',
                product: update
            }
        )
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({
                success: false,
                message:'General error',
                e
            })
    }
}

export const stockProduct = async(req, res)=>{
    try {
        const stockProduct = await Product.find(
            { 
                stock: 0
            }
        )

        if(stockProduct.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    messsage: 'There are no products out of stock'
                }
            )
        }
        return res.send({
            success: true,
            message: 'Out of stock products are:',
            product: stockProduct
        })
        
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({
                success: false,
                message:'General error',
                e
            })
    }
}

export const bestSellers = async(req, res)=>{
    try {
        const bestSellers = await Product.find()
            .sort({ sales: -1})
            .limit(10) 
            .select("name sales stock") 

        if(!bestSellers.length){
            return res.status(404).send(
                {
                    success: false,
                    messsage: "No hay productos vendidos"
                }
            )
        }
        return res.send({
            success: true,
            message: 'Los productosmas vendidos son',
            product: bestSellers
        }
    )

    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({
                success: false,
                message:'General error',
                e
            })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        let deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).send({ message: 'Product not found, not deleted' })
        }

        return res.send({ message: 'Deleted product successfully', deletedProduct })
    } catch (error) {
        console.error('General Error', error)
        return res.status(500).send({ message: 'General Error', error })
    }
}

export const searchProductsByName = async (req, res) => {
    try {
        const { name } = req.params // Obtener el nombre del producto desde los parametros de la ruta

        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Product name is required'
            })
        }

        // Buscar productos que coincidan con el nombre (usando una expresión regular)
        const products = await Product.find({
            name: { $regex: name, $options: 'i' } // 'i' para hacer la bqueda sin importar  mayusculas y minsculas
        }).populate({
            path: 'category',
            select: 'name -_id'
        })

        if (products.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No products found with that name'
            })
        }

        return res.send({
            success: true,
            message: 'Products found:',
            products
        })
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send({
            success: false,
            message: 'General error',
            error
        })
    }
}


export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params 

        
        const category = await Category.findOne({ name: categoryName })

        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        // Buscar productos que pertenecen a la categoria encontrada
        const products = await Product.find({ category: category._id }).populate({
            path: 'category',
            select: 'name -_id'
        })

        if (products.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No products found in this category'
            })
        }

        return res.send({
            success: true,
            message: 'Products found in category:',
            products
        })
    } catch (error) {
        console.error('General error', error)
        return res.status(500).send({
            success: false,
            message: 'General error',
            error
        })
    }
}