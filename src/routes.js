import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Add from './Components/Add/Add';
import Cart from './Components/Cart/Cart';
import Dashboard from './Components/Dashboard/Dashboard';
import Edit from './Components/Edit/Edit';
import Landing from './Components/Landing/Landing';
import Product from './Components/Product/Product';
import Products from './Components/Products/Products';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/dashboard/products' component={Products} />
        <Route path='/dashboard/products/:product_id' component={Product} />
        <Route path='/dashboard/add' component={Add} />
        <Route path='/dashboard/edit/:product_id' component={Edit} />
        <Route path='/dashboard/cart' component={Cart} />
    </Switch>
)
