import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, TextField, CardContent, CardActions, Button, InputAdornment } from '@material-ui/core';

//Redux Hooks imports
import { useDispatch, useSelector } from 'react-redux';
//REDUx ACTIONS
import { addNewProductAction } from '../../redux/actions/productsActions';
//notistack import 
import { useSnackbar } from 'notistack';

//styles
import useStyles from './style';
const NewProduct = ({ history }) => {
    //Styles
    const classes = useStyles();
    //notistack 
    const { enqueueSnackbar } = useSnackbar();
    // REDUX use of use Dispatch
    const dispatch = useDispatch();
    // REDUX use of useSelector to have access to the STORE
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const submited = useSelector(state => state.products.submited);
    const reloader = useSelector(state => state.products.reloader);

    // Local State
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

    //EFFECT
    useEffect(() => {
        const checkSubmition = () => {
            if (submited) {
                if (error) {
                    enqueueSnackbar("There was an error while adding the product",
                        { variant: 'error', preventDuplicate: true });
                } else {
                    enqueueSnackbar("Product successfully added",
                        { variant: 'success', preventDuplicate: true });
                    history.push('/');
                }

            }
        }
        checkSubmition();
        // eslint-disable-next-line
    }, [reloader]);

    const handleChange = (prop) => (event) => {
        let [priceError, priceHelper] = [false, ''];
        let inputValue = event.target.value;
        if (prop === "price") {
            if (inputValue.trim()) {
                if (Number(inputValue.trim() < 0)) {
                    [priceError, priceHelper] = [true, 'The price cannot be less than 0'];
                    inputValue = "0";
                }
            }
        }
        setForm({
            ...form,
            [prop]: inputValue
        })
        setErrors({
            ...errors,
            [prop]: priceError
        })
        setHelpers({
            ...helpers,
            [prop]: priceHelper
        })
    };


    const addProduct = (product) => {
        dispatch(addNewProductAction(product));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation of the form
        let [nameError, priceError] = [false, false];
        let [nameHelper, priceHelper] = ['', ''];


        if (form.name.trim() === '') {
            [nameError, nameHelper] = [true, 'Type the product name'];

        }

        if (form.price.trim() === '') {
            [priceError, priceHelper] = [true, 'Type the product price'];
        }
        if (form.price.trim()) {
            if (Number(form.price.trim() <= 0)) {
                [priceError, priceHelper] = [true, 'The price cannot be 0'];
            }
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

            enqueueSnackbar("Fill the form correctly",
                { variant: 'error', preventDuplicate: true });

            return;
        }

        console.log("Submiting..")
        // Create a new Product
        addProduct({
            name: form.name,
            price: Number(form.price)
        });

    }


    return (
        <Grid container justify="center" spacing={2}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Card className={classes.card} elevation={4}>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Typography variant="h5" className={classes.typo} color="textSecondary">
                                Add a new Product
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
                                        helperText={helpers.name}
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
                                        helperText={helpers.price}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained" size="small" className={classes.btn} color="primary">Add</Button>
                        </CardActions>
                    </form>
                    {loading &&
                        <Typography variant="h5" className={classes.typo} color="textSecondary">
                            Loading...
                        </Typography>

                    }
                </Card>

            </Grid>
        </Grid>

    );
}

export default NewProduct;
