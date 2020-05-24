import{
    SHOW_ALERT,
    HIDE_ALERT
}from '../../actionTypes';

//SHOWALERTS ACtion
export const showAlertAction = (alert)=>{
    return(dispatch)=>{
        dispatch(showAlert())
    }
}
const showAlert=(alert)=>({
    type:SHOW_ALERT,
    payload: alert
})