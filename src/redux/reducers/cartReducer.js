import axios from 'axios';

//initial state
const initialState = {
    cart: undefined
}

//const strings
export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

//functions
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
    return {
        type: REMOVE_FROM_CART,
        payload: axios.delete(`/cart/delete/${product_id}`)
    }
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
        case `${GET_CART}_FULFILLED`:
            return {
                ...state,
                cart: payload.data
            }
        case `${ADD_TO_CART}_FULFILLED`:
            return {
                ...state,
                cart: [...state.cart, payload.data]
            }
        case `${REMOVE_FROM_CART}_FULFILLED`:
            return {
                ...state,
                cart: payload.data
            }
        case `${CLEAR_CART}_FULFILLED`:
            return {
                cart: [],
                count: 0
            }      
        default: return state
    }
}