import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import { getProducts } from '../../redux/reducers/productReducer';
import { getCart } from '../../redux/reducers/cartReducer';
import logo from '../../logo.png';
import './Dashboard.css';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import Add from '../Add/Add';
import Cart from '../Cart/Cart';
import Edit from '../Edit/Edit';
import Product from '../Product/Product';
import Products from '../Products/Products';
import Routes from './routes';

class Dashboard extends Component {
    
    componentDidMount() {
        // console.log(this.props.user_id)
        // if(!this.props.user_id) {
        //     // alert('Please enter a valid username and password')
        //     this.props.history.push('/')
        // }
        // this.props.getProducts()

        
    }

    componentDidUpdate(prevProps) {
        if(this.props.user_id) {
            this.props.getProducts()
            if(!this.props.cart){
                this.props.getCart()
            }
        }
    }

    render() {
        return (
            <div className='dashboard-main-container'>
                <section className='dashboard-nav-container'>
                    <div>
                        <img src={logo} alt='Wands at the Ready' />
                    </div>
                    <div>
                        <Link to='/'><button onClick={this.props.logout}>Logout</button></Link>
                        <Link to='/dashboard/cart'><button><i class="fas fa-shopping-cart"></i>({this.props.cart ? this.props.cart.length : 0})</button></Link>
                    </div>
                </section>
                <section>
                <Switch>
                    <Route exact path='/dashboard/add' component={Add} />
                    <Route exact path='/dashboard/edit/:product_id' component={Edit} />
                    <Route exact path='/dashboard/cart' component={Cart} />
                    <Route exact path='/dashboard' component={Products} />
                    <Route path='/dashboard/:product_id' component={Product} />
                </Switch>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        username: reduxState.userReducer.username,
        isAdmin: reduxState.userReducer.isAdmin,
        cart: reduxState.cartReducer.cart
    }
}

export default connect(mapStateToProps, {
    logout,
    getProducts,
    getCart
})(withRouter(Dashboard))
