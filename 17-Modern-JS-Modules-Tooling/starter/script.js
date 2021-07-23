/* import {addToCart, totalPrice as price, tq} from './shoppingCart.js';

console.log('import')

addToCart('bread',5)

console.log(tq,price) */

//import { totalPrice } from "./shoppingCart"

//import * as shoppingCart from './shoppingCart.js'

/* shoppingCart.addToCart("bread",5)
console.log(shoppingCart) */


//import add, {addToCart, totalPrice as price, tq} from './shoppingCart.js'

//import add, {addToCart, totalPrice as price, tq} from './shoppingCart.js'
//console.log(price)
/* 
import add, { cart } from './shoppingCart.js'

add('pizza',2)
add('bread',7)
add('sugar',20)

console.log(cart) */

const ShoppingCart2 =(()=>{
    const cart = []
    const shippingCost = 10
    const totalPrice = 237
    const totalQuantity = 23 
    
    const addToCart = function(product, quantity){
        cart.push({product,quantity})
        console.log(`${quantity} ${product} added to cart`)
    }
    const orderStock = function(product, quantity){
        cart.push({product,quantity})
        console.log(`${quantity} ${product} order from supplier`)
    }
    return{
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    }
})()

ShoppingCart2.addToCart('apple',4)
ShoppingCart2.addToCart('pizza',2)
console.log(ShoppingCart2)
console.log(ShoppingCart2.shippingCost)

import  cloneDeep from "lodash-es"

const state ={
    cart :[
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 5},
    ],
    user: {loggedIn: true},
}
const stateDeepClone = cloneDeep(state)
const stateClone = Object.assign({},state)
state.user.loggedIn = false
console.log(stateClone)


console.log(stateDeepClone) 

if(module.hot){
    module.hot.accept()
} 

class Person{
    constructor(name){
        this.name = name
        console.log(`Hey, ${this.name}`)
    }
}
const jonas = new Person('Jonas')

console.log('Jonas')

console.log(cart.find(el => el.quantity >=2))
Promise.resolve('TEST').then(x=> console.log(x))