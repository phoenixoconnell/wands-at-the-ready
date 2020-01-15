import axios from 'axios';

//initial state
const initialState = {
    user_id: null,
    username: '',
    isAdmin: false
}

//const strings
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

//functions
export function register(username, password, isAdmin){
    const user = {
        username,
        password,
        isAdmin
    }
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register')
    }
}

export function login(username, password){
    const user = {
        username,
        password
    }
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', user)
    }
}

export function logout(){
    return {
        type: LOGOUT_USER,
        payload: axios.post('/auth/logout')
    }
}

//reducer
export default function reducer(state = initialState, action){
    const { type, payload } = action
    switch(type){
        case `${REGISTER_USER}_FULFILLED`:
            return {
                ...state,
                user_id: payload.data.user_id,
                username: payload.data.username,
                isAdmin: payload.data.isAdmin
            }
        case `${LOGIN_USER}_FULFILLED`:
            return {
                ...state,
                user_id: payload.data.user_id,
                username: payload.data.username,
                isAdmin: payload.data.isAdmin
            }
        case `${LOGOUT_USER}_FULFILLED`:
            return {
                ...state,
                user_id: null,
                username: '',
                isAdmin: false
            }    
        default: return state;
    }
}