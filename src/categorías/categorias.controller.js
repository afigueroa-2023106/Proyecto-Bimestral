import Categoria from "./categorias.model.js"

export const getAllCategorias = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const categorias = await Categoria.find()
            .skip(Number(skip))
            .limit(Number(limit))

        if (categorias.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No categories found'
            });
        }
        return res.send({
            success: true,
            message: 'Categories found:',
            categorias
        });
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params
        const categoria = await Categoria.findById(id)

        if (!categoria) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }
        return res.send({
            success: true,
            message: 'Category found:',
            categoria
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

export const createCategoria = async (req, res) => {
    try {
        const data = req.body
        const categoria = new Categoria(data)
        await categoria.save()
        return res.send({
            success: true,
            message: 'Category created:',
            categoria
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

export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const updatedCategoria = await Categoria.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        if (!updatedCategoria) {
            return res.status(404).send({
                success: false,
                message: 'Category not found and not updated'
            })
        }
        return res.send({
            success: true,
            message: 'Category updated:',
            categoria: updatedCategoria
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

export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCategoria = await Categoria.findByIdAndDelete(id)

        if (!deletedCategoria) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }
        return res.send({
            success: true,
            message: 'Category removed successfully'
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