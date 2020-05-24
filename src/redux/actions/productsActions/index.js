import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    RESET_STATE,
    GET_PRODUCTS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    GET_PRODUCT_EDIT,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../../actionTypes';

//axiosClient import
import axiosClient from '../../../config/axios';

// CREATION OF A PRODUCT
export const addNewProductAction = product => {

    return async (dispatch) => {

        dispatch(addProduct(true));
        try {
            //Insert in the API
            const response = await axiosClient.post('/products', product);
            //if everything goes right
            console.log(response.data);
            dispatch(addProductSuccess(response.data));
            dispatch(resetState());


        } catch (error) {
            // In case of an error
            console.log(error.response);
            dispatch(addProductError(true));
            dispatch(resetState());
        }
    }
}
// START THE ADDITION OF A PRODUCT
const addProduct = (loading) => ({
    type: ADD_PRODUCT,
    payload: loading
})
// IN CASE THE ADITTION SUCCED
const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})
// IN CASE THE ADITTION FAIL
const addProductError = (error) => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
})
// RESET THE ERRORS AND SUBMIT
const resetState = () => ({
    type: RESET_STATE
})


// GET OF PRODUCTS
export const getProductsAction = () => {
    return async (dispatch) => {
        dispatch(getProducts(true));
        try {
            const response = await axiosClient.get('/products');
            const products = await response.data.sort(sorting);
            dispatch(getProductsSuccess(products));
            dispatch(resetState());
        } catch (error) {
            // In case of an error
            console.log(error.response);
            dispatch(getProductsError(true));
            dispatch(resetState());
        }
    }
}
//SORT PRODUCTS
const sorting = (a, b) => {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    // a must be equal to b
    return 0;
}
// START GETTING THE PRODUCTS
const getProducts = (loading) => ({
    type: GET_PRODUCTS,
    payload: loading
})
// IN CASE THE GET SUCCED
const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products
})
// IN CASE THE GET FAIL
const getProductsError = (error) => ({
    type: GET_PRODUCTS_ERROR,
    payload: error
})


//DELETE PRODUCTS
export const deleteProductAction = (id) => {
    return async (dispatch) => {
        dispatch(deleteProduct(id));
        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch(deleteProductSuccess());
            dispatch(resetState());

        } catch (error) {
            console.log(error.response)
            dispatch(deleteProductError())
            dispatch(resetState());
        }
    }
}
//start product deletion
const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id
})
//IN CASE OF SUCCESs
const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS,
})
//IN CASE OF AN ERROR
const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
})



export const getProductToEditAction = (id) => {
    return (dispatch) => {
        dispatch(getProductToEdit(id));
    }
}
//GET PRODUCT TO EDITION
const getProductToEdit = (id) => ({
    type: GET_PRODUCT_EDIT,
    payload: id
})



//GET ACTION OF A SINGLE PRODUCT
export const editProductAction = (product) => {
    return async (dispatch) => {
        dispatch(editProduct());
        try {
            const response = await axiosClient.put(`/products/${product.id}`, product);
            console.log(response.data);
            dispatch(editProductSuccess(response.data));
            dispatch(resetState());

        } catch (error) {
            console.log(error);
            dispatch(editProductError(true));
            dispatch(resetState());
        }
    }

}

//Start WITH THE EDITION
const editProduct = () => ({
    type: EDIT_PRODUCT,
})
// IN CASE OF SUCCESS
const editProductSuccess = (product) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
})
//IN CASE OF AN ERROR
const editProductError = (error) => ({
    type: EDIT_PRODUCT_ERROR,
    payload: error
})
//
