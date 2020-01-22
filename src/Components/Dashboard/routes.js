import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Add from '../Add/Add';
import Cart from '../Cart/Cart';
import Edit from '../Edit/Edit';
import Product from '../Product/Product';
import Products from '../Products/Products';

export default (
    <Switch>
        <Route exact path='/dashboard' component={Products} />
        <Route path='/dashboard/products/:product_id' component={Product} />
        <Route path='/dashboard/add' component={Add} />
        <Route path='/dashboard/edit/:product_id' component={Edit} />
        <Route path='/dashboard/cart' component={Cart} />
    </Switch>
)