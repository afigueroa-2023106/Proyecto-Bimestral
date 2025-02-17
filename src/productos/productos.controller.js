import Productos from "./productos.model.js"
import Categoria from "../categorías/categorias.model.js"

const validPrices = ['low', 'medium', 'high']

export const getAllProductos = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const productos = await Productos.find()
            .populate("categoria")
            .skip(Number(skip))
            .limit(Number(limit))

        if (productos.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No products found'
            })
        }
        return res.send({
            success: true,
            message: 'Products found:',
            productos
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Productos.findById(id).populate("categoria")

        if (!producto) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }
        return res.send({
            success: true,
            message: 'Product found:',
            producto
        })
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const createProducto = async (req, res) => {
    try {
        const data = req.body

        const categoriaExists = await Categoria.findById(data.categoria)
        if (!categoriaExists) {
            return res.status(400).send({
                success: false,
                message: 'Category not found',
            })
        }

        if (!validPrices.includes(data.price)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid price. It must be one of the following: low, medium, high.',
            })
        }

        const producto = new Productos(data)
        await producto.save()

        return res.send({
            success: true,
            message: 'Product created:',
            producto
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const categoriaExists = await Categoria.findById(data.categoria);
        if (!categoriaExists) {
            return res.status(400).send({
                success: false,
                message: 'Category not found',
            });
        }

        // Validate price
        if (!validPrices.includes(data.price)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid price. It must be one of the following: low, medium, high.',
            });
        }

        const updatedProducto = await Productos.findByIdAndUpdate(
            id,
            data,
            { new: true }
        ).populate("categoria")

        if (!updatedProducto) {
            return res.status(404).send({
                success: false,
                message: 'Product not found and not updated'
            })
        }

        return res.send({
            success: true,
            message: 'Product updated:',
            producto: updatedProducto
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProducto = await Productos.findByIdAndDelete(id);

        if (!deletedProducto) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }

        return res.send({
            success: true,
            message: 'Product removed successfully'
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
