import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Component imports
import NewProduct from '../components/newProduct';
import EditProduct from '../components/editProduct';

import CustomPaginationActionsTable from '../components/products';
//PrivateRoutes

const Router = () => {
    return (
        <Switch>
            <Route exact path='/' component={CustomPaginationActionsTable}></Route>
            <Route exact path='/products/new' component={NewProduct}></Route>
            <Route exact path='/products/edit/:id' component={EditProduct}></Route>
            
            {/* <Redirect from="/" to="/" /> */}
            {/*
            <Route component={NotFound}></Route> */}
        </Switch>
    );
}

export default Router;
