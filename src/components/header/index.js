import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid, AppBar, Toolbar, Hidden, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useStyles from './style';

import { Link } from 'react-router-dom';

const Header = ({ title }) => {
    const classes = useStyles();
    return (

        <AppBar position="static" className={classes.appBar}>
            <Toolbar id='back-to-top-anchor' variant="dense">
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"

                >

                    <Grid item xs={12} sm={8} md={9} lg={10}>
                        <Hidden smUp>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h6" color="inherit" className={classes.typo} component={Link} to={"/"} underline="none" style={{ textDecoration: 'none' }}>

                                    {title}

                                </Typography>
                            </Grid>
                        </Hidden>
                        <Hidden xsDown>
                            <Typography variant="h6" color="inherit" className={classes.typo} component={Link} to={"/"} underline="none" style={{ textDecoration: 'none' }}>

                                {title}

                            </Typography>
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <Button
                            variant="contained"
                            startIcon={<AddCircleOutlineIcon />}
                            color="secondary"
                            className={classes.btnn}
                            component={Link}
                            to={"/products/new"}
                        >
                            Add Product
                        </Button>
                    </Grid>

                </Grid>


            </Toolbar>
        </AppBar >



    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
export default Header;
