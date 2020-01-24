import axios from 'axios';

//initial state
const initialState = {
    products: [],
    product: {},
    loading: false
}

//const strings
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT = 'GET_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'

//functions
export function getProducts(){
    return {
        type: GET_PRODUCTS,
        payload: axios.get('/api/products')
    }
}

export function getProduct(product_id){
    return {
        type: GET_PRODUCT,
        payload: axios.get(`/api/products/${product_id}`)
    }
}

export function addProduct(product){
    return {
        type: ADD_PRODUCT,
        payload: axios.post('/admin/add', product)
    }
}

export function editProduct(product, product_id){
    console.log(product_id)
    return {
        type: EDIT_PRODUCT,
        payload: axios.put(`/admin/edit/${product_id}`, product)
    }
}

export function deleteProduct(product_id){
    return {
        type: DELETE_PRODUCT,
        payload: axios.delete(`/admin/delete/${product_id}`)
    }
}

export function setProduct(product_id){
    return {
        type: SET_PRODUCT,
        payload: axios.get(`/api/products/${product_id}`)
    }
}

//reducer

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case `${GET_PRODUCTS}_FULFILLED`:
            // console.log('products: ', payload.data)
            return {
                ...state,
                products: payload.data
            }
        case `${GET_PRODUCT}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${GET_PRODUCT}_FULFILLED`:
            return {
                ...state,
                product: payload.data,
                loading: false
            }
        case `${ADD_PRODUCT}_FULFILLED`:
            return {
                ...state,
                products: payload.data
            }
        case `${EDIT_PRODUCT}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${EDIT_PRODUCT}_FULFILLED`:
            return {
                ...state,
                products: payload.data,
                loading: false
            }    
        case `${DELETE_PRODUCT}_FULFILLED`:
            return {
                ...state,
                products: payload.data,
                loading: false
            } 
        case `${DELETE_PRODUCT}_PENDING`:
            return {
                ...state,
                loading: true
            }  
        case `${SET_PRODUCT}_FULFILLED`:
            return {
                ...state,
                product: payload.data
            }     
        default: return state    
    }
}