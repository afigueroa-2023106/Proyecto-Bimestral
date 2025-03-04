import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'

export const addToCart = async (req, res) => {
    try {
        const { productName } = req.body
        const userId = req.user.uid

        if (!userId) {
            return res.status(400).send({ message: 'User  ID is required' })
        }

        const product = await Product.findOne({ name: productName })
        if (!product) {
            return res.status(404).send({ message: 'Product not found' })
        }

        let cart = await Cart.findOne({ userId })

        if (cart) {
            const existingProduct = cart.products.find(item => item.productId.equals(product._id))

            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                cart.products.push({ 
                    productId: product._id, 
                    productName: product.name,
                    quantity: 1 
                })
            }
            await cart.save()
        } else {    
            const newCart = new Cart({
                userId,
                products: [{ 
                    productId: product._id, 
                    productName: product.name,
                    quantity: 1
                }]
            })
            await newCart.save()
        }
        return res.send({ message: 'Product added to cart' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding to cart', error })
    }
}