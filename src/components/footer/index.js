import React from 'react';
import { Grid, AppBar, Typography, Toolbar } from '@material-ui/core';
import useStyles from './style';

const Footer = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar variant="dense">
                <Grid container justify="center" spacing={0} >
                    <Typography variant="h6" className={classes.typo}> MattuApp&copy; 2020 </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}



export default Footer;
