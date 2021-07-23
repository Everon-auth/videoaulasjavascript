console.log('export')


const shippingCost = 10
export const cart = []


export const addToCart = function(product, quantity){
    cart.push({product,quantity})
    console.log(`${quantity} ${product} added to cart`)
}

const totalPrice = 237
const totalQauntity = 23
export {totalPrice, totalQauntity as tq}

export default function(product, quantity){
    cart.push({product,quantity})
    console.log(`${quantity} ${product} added to cart`)
}