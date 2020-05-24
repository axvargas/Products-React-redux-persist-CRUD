import React, { useEffect, useState, Fragment } from 'react';

//Material ui imports
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    Hidden,
    Typography
} from '@material-ui/core';


import TablePaginationActions from './tablePagination'

//style imports
import useStyles from './style';

//component imports
import Product from '../product';

//notistack import 
import { useSnackbar } from 'notistack';

//REDUX HOOKS imports
import { useDispatch, useSelector } from 'react-redux';
//REDUX Actions imports
import { getProductsAction } from '../../redux/actions/productsActions';

export default function CustomPaginationActionsTable() {

    //Styles
    const classes = useStyles();
    //notistack 
    const { enqueueSnackbar } = useSnackbar();
    //Store selector
    const products = useSelector(state => state.products.products);
    const error = useSelector(state => state.products.error);
    const reloader = useSelector(state => state.products.reloader);
    const submited = useSelector(state => state.products.submited);
    // Dispatch hook
    const dispatch = useDispatch();

    // EFFECT
    useEffect(() => {
        const getProducts = () => dispatch(getProductsAction());
        if (!submited) {
            getProducts();
        }
        if (submited) {
            if (error) {
                enqueueSnackbar("There was an error while adding the products",
                    { variant: 'error', preventDuplicate: true });
            } else {
                enqueueSnackbar("Products gotten",
                    { variant: 'success', preventDuplicate: true });
            }
        }
        // eslint-disable-next-line
    }, [reloader]);



    //Local state about the products
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Fragment>
            <Typography variant="h5" className={classes.typo} color="textSecondary">
                Products
            </Typography>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head} align="right">Prices</TableCell>
                            <TableCell className={classes.head} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : products
                        ).map((product) => (
                            <Product key={product.id} product={product} />
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                className={classes.foot}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'products per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                labelRowsPerPage={<Hidden xsDown>Rows per page:</Hidden>}

                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Fragment>
    );
}