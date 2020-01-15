import axios from 'axios';

//initial state
const initialState = {
    cart: [],
    count: 0
}

//const strings
export const CART_COUNT = 'CART_COUNT'
export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

//functions
export function cartCount(){
    return {
        type: CART_COUNT,
        payload: axios.get('/cart/count')
    }
}

export function getCart(){
    return {
        type: GET_CART,
        payload: axios.get('/cart/products')
    }
}

export function addToCart(product_id){
    return {
        type: ADD_TO_CART,
        payload: axios.post(`/cart/add/${product_id}`)
    }
}

export function removeFromCart(product_id){
    axios.delete(`/cart/delete/${product_id}`).then(result => {
        return {
            type: REMOVE_FROM_CART,
            payload: product_id
        }
    })
}

export function clearCart(){
    return {
        type: CLEAR_CART,
        payload: axios.delete('/cart/clear')
    }
}

//reducer
export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case `${CART_COUNT}_FULFILLED`:
            return {
                ...state,
                count: payload.data
            }
        case `${GET_CART}_FULFILLED`:
            return {
                ...state,
                cart: payload.data
            }
        case `${ADD_TO_CART}_FULFILLED`:
            return state
        case `${REMOVE_FROM_CART}`:
            const updated = state.cart.filter(e => e.id != payload)
            return {
                ...state,
                cart: updated
            }
        case `${CLEAR_CART}_FULFILLED`:
            return {
                cart: [],
                count: 0
            }      
        default: return state
    }
}