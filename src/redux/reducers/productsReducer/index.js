import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    RESET_STATE,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR,
    GET_PRODUCT_EDIT
} from '../../actionTypes';
// every reducer has its own state
const initialState = {
    products: [],
    error: null,
    loading: false,
    reloader: false,
    submited: false,
    productToDelete: null,
    deleted: null,
    productToEdit: null
}
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: payload

            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                products: [payload, ...state.products],
                reloader: !state.reloader,
                submited: true

            }
        case GET_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                reloader: !state.reloader,
                submited: true

            }
        case RESET_STATE:
            return {
                ...state,
                error: null,
                submited: null,
                productToDelete: null,
                deletion: null,
                productToEdit: null
            }

        case GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                products: payload,
                submited: true,
                reloader: !state.reloader,

            }
        }
        case DELETE_PRODUCT: {
            return {
                ...state,
                productToDelete: payload
            }
        }
        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: state.products.filter((product) => product.id !== state.productToDelete),
                deletion: true
            }
        }
        case DELETE_PRODUCT_ERROR: {
            return {
                ...state,
                error: true,
                submited: true,
                deletion: false,
            }
        }
        case GET_PRODUCT_EDIT:{
            return{
                ...state,
                productToEdit: state.products.find((product) => product.id === payload),
            }
        }

        case EDIT_PRODUCT: {
            return {
                ...state,
                loading: true,
                //productToEdit: payload
            }
        }
        case EDIT_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                submited: true,
                products: state.products.map(product=> product.id === payload.id? product = payload: product),
            }
        }
        case EDIT_PRODUCT_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                submited: true,
            }
        }
        default:
            return state;
    }
}