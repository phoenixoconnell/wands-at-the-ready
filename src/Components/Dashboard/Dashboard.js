import React, { Component } from 'react';
import { connect } from 'react-redux';
import Add from '../Add/Add';
import { logout } from '../../redux/reducers/userReducer';
import { getProducts } from '../../redux/reducers/productReducer';
import { getCart } from '../../redux/reducers/cartReducer';
import './Dashboard.css';
import Products from '../Products/Products';
import { Link, withRouter } from 'react-router-dom';

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
            <div>
                <section>
                    <h1>Dashboard</h1>
                    <Link to='/'><button onClick={this.props.logout}>Logout</button></Link>
                    <Link to='/dashboard/cart'><button><i class="fas fa-shopping-cart"></i>({this.props.cart ? this.props.cart.length : 0})</button></Link>
                </section>
                {this.props.isAdmin ? 
                    (
                        <div>
                            <Link to='/dashboard/add'><button>Add Product</button></Link>
                        </div>
                    )
                :
                    null
                }
                <section>
                    <Products />
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
