import React, { useState, Fragment, useEffect } from 'react';
//router-dom imports
import {  useHistory } from 'react-router-dom';
//Materialui imports
import { TableRow, TableCell, IconButton, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductAction, getProductToEditAction } from '../../redux/actions/productsActions';

//notistack import 
import { useSnackbar } from 'notistack';
//Component imports
import AlertDialog from '../dialog';
//Style imports
import useStyles from './style';
const Product = ({ product }) => {
    //Styles
    const classes = useStyles();
    //notistack 
    const { enqueueSnackbar } = useSnackbar();
    //react-router-dom Hook
    const history = useHistory();
    //Redux Hooks
    const dispatch = useDispatch();
    // Redux store
    const deletion = useSelector(state => state.products.deletion);
    
    //Local stage about the Dialog
    const [open, setOpen] = useState(false);

    //EFFECT
    useEffect(() => {
        if (deletion === true) {
            enqueueSnackbar("product deleted",
                { variant: 'success', preventDuplicate: true });
        }
        if (deletion === false) {
            enqueueSnackbar("There was an error while deleting the products",
                { variant: 'error', preventDuplicate: true });
        }
        // eslint-disable-next-line
    }, [deletion]);
    const deleteProduct = () => {
        dispatch(deleteProductAction(product.id))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    //Function to redirect in program way
    const redirectToEdit = () => {
        console.log(product.id);
        dispatch(getProductToEditAction(product.id));
        
        history.push(`products/edit/${product.id}`)
    } 

    return (
        <Fragment>
            
            <TableRow className={classes.tableR} >
                <TableCell component="th" scope="product">
                    {product.name}
                </TableCell>
                <TableCell align="right">
                    $ {product.price}
                </TableCell>
                <TableCell align="right">
                    <Grid container justify='flex-end' spacing={1}>
                        <Grid item className={classes.edit}>
                            <IconButton aria-label="delete" size="small" className={classes.btn} onClick={redirectToEdit}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="delete" size="small" className={classes.btn} onClick={handleClickOpen} >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
            <AlertDialog name={product.name} open={open} setOpen={setOpen} deleteProduct={deleteProduct} />
        </Fragment>
    );
}

export default Product;
