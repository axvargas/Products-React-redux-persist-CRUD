import React, { useState, useEffect } from 'react';
//MAterial ui imports
import { Typography, Grid, Card, TextField, CardContent, CardActions, Button, InputAdornment } from '@material-ui/core';

//REDUX imports
import { useDispatch, useSelector } from 'react-redux';
//REDUX aCTIONS imports
import {  editProductAction } from '../../redux/actions/productsActions';
//react-router-dom hooks imports
import { useHistory } from 'react-router-dom';

//notistack import 
import { useSnackbar } from 'notistack';

//style imports
import useStyles from './style';
const EditProduct = () => {
    //style
    const classes = useStyles();
    //notistack 
    const { enqueueSnackbar } = useSnackbar();
    //r-r-d hooks
    const history = useHistory();

    //redux hooks
    const dispatch = useDispatch();
    //redux state hook
    const productToEdit = useSelector(state => state.products.productToEdit);
    // REDUX use of useSelector to have access to the STORE
    const error = useSelector(state => state.products.error);
    const submited = useSelector(state => state.products.submited);

    //Local State

    const [form, setForm] = useState({
        name: '',
        price: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        price: false
    });
    const [helpers, setHelpers] = useState({
        name: '',
        price: ''
    });

    useEffect(() => {
        const checkSubmition = () => {
            if (submited) {
                if (error) {
                    enqueueSnackbar("There was an error while editing the product",
                        { variant: 'error', preventDuplicate: true });
                    return;
                } else {
                    enqueueSnackbar("Product successfully edited",
                        { variant: 'success', preventDuplicate: true });
                    history.push('/');
                    return;
                }

            }
        }
        checkSubmition();

        if (productToEdit) {
            setForm({
                name: productToEdit.name,
                price: productToEdit.price
            })
        } else {
            history.push('/');
        }
        // eslint-disable-next-line
    }, [submited]);

    const handleChange = (prop) => (event) => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
        setErrors({
            ...errors,
            [prop]: false
        })
        setHelpers({
            ...helpers,
            [prop]: ''
        })
    };
    const editProduct = (product) => {
        dispatch(editProductAction(product));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        let [nameError, priceError] = [false, false];
        let [nameHelper, priceHelper] = ['', ''];


        if (form.name.trim() === '') {
            [nameError, nameHelper] = [true, 'Type the product name'];

        }

        if (form.price.trim() === '') {
            [priceError, priceHelper] = [true, 'Type the product price'];
        }
        if (nameError || priceError) {
            setErrors({
                name: nameError,
                price: priceError
            })
            setHelpers({
                name: nameHelper,
                price: priceHelper
            })
            console.log('Stopped');

            enqueueSnackbar("Fill the form",
                { variant: 'error', preventDuplicate: true });
            return;
        }
        console.log("Submiting..");

        editProduct({
            id: productToEdit.id,
            name: form.name,
            price: form.price
        });




    }

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Card className={classes.card} elevation={4}>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Typography variant="h5" className={classes.typo} color="textSecondary">
                                Edit the product
                            </Typography>
                            <Grid container direction="column" justify="center" spacing={2}>
                                <Grid item>
                                    <TextField
                                        autoComplete="off"
                                        className={classes.txt}
                                        id="name-filled"
                                        label="Product name"
                                        variant="filled"
                                        value={form.name}
                                        onChange={handleChange("name")}
                                        error={errors.name}
                                        helper={helpers.name}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        autoComplete="off"
                                        className={classes.txt}
                                        type="number"
                                        id="price-filled"
                                        label="Product price"
                                        variant="filled"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">$</InputAdornment>
                                            ),
                                        }}
                                        value={form.price}
                                        onChange={handleChange("price")}
                                        error={errors.price}
                                        helper={helpers.price}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained" size="small" className={classes.btn} color="primary">Add</Button>
                        </CardActions>
                    </form>
                </Card>

            </Grid>
        </Grid>

    );
}

export default EditProduct;
