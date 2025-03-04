import Cart from '../cart/cart.model.js'
import Invoice from './invoice.model.js'
import Product from '../product/product.model.js'

export const completePurchase = async (req, res) => {
    try {
        const userId = req.user.uid

        const cart = await Cart.findOne({ userId })
        if (!cart || cart.products.length === 0) {
            return res.status(400).send({ message: 'Cart is empty' })
        }

        let totalAmount = 0
        const productsToInvoice = []

        for (const item of cart.products) {
            const product = await Product.findById(item.productId)
            if (!product || product.stock < item.quantity) {
                return res.status(400).send({ message: `Insufficient stock for product ID ${item.productId}` })
            }
            totalAmount += product.price * item.quantity

            productsToInvoice.push({
                productId: product._id,
                productName: product.name, 
                price: product.price, 
                quantity: item.quantity
            })
        }

        const invoice = new Invoice({
            userId,
            products: productsToInvoice,
            totalAmount,
            status: 'COMPLETED'
        })
        await invoice.save()

        for (const item of cart.products) {
            await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } })
        }

        await Cart.findOneAndDelete({ userId })

        return res.send({ message: 'Purchase completed successfully', invoice })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error completing purchase', error })
    }
}

export const getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user.uid 

        const invoices = await Invoice.find({ userId }).populate('products.productId')

        if (!invoices || invoices.length === 0) {
            return res.status(404).send({ message: 'No purchase history found' })
        }

        return res.send(invoices)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error retrieving purchase history', error })
    }
}
export const editInvoice = async (req, res) => {
    const { id: invoiceId } = req.params
    const { updatedItems } = req.body
    const userId = req.user?.uid

    if (!Array.isArray(updatedItems)) {
        return res.status(400).send({ message: 'updatedItems must be an array' })
    }

    try {
        const invoice = await Invoice.findById(invoiceId)
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found' })
        }

        if (invoice.userId.toString() !== userId.toString()) {
            return res.status(403).send({ message: 'You do not have permission to edit this invoice' })
        }

        let totalAmount = 0

        for (const item of updatedItems) {
            const product = await Product.findById(item.productId)
            if (!product) {
                return res.status(400).send({ message: `Product not found: ${item.productId}` })
            }

            if (item.quantity > product.stock) {
                return res.status(400).send({ message: `Insufficient stock for product ${item.productId}` })
            }

            // Calcular la diferencia de cantidad
            const existingProduct = invoice.products.find(p => p.productId.toString() === item.productId.toString())
            const existingQuantity = existingProduct ? existingProduct.quantity : 0

            if (item.quantity > existingQuantity) {
                const quantityToDeduct = item.quantity - existingQuantity
                await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -quantityToDeduct } })
            } else if (item.quantity < existingQuantity) {
                const quantityToAdd = existingQuantity - item.quantity
                await Product.findByIdAndUpdate(item.productId, { $inc: { stock: quantityToAdd } })
            }

            // Actualizar el total de la factura
            totalAmount += product.price * item.quantity

            // Modificar el producto dentro de la factura
            if (existingProduct) {
                existingProduct.quantity = item.quantity
                existingProduct.price = product.price
                existingProduct.productName = product.name
            } else {
                // Si el producto no existe en la factura, agrega
                invoice.products.push({
                    productId: product._id,
                    productName: product.name,
                    price: product.price,
                    quantity: item.quantity
                })
            }
        }

        // Update
        invoice.totalAmount = totalAmount

        // Guardar la factura actualizada
        await invoice.save()

        return res.send({ message: 'Invoice updated successfully', invoice })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating the invoice', error: error.message })
    }
}

