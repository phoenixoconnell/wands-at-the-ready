import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, clearCart, getCart } from '../../redux/reducers/cartReducer';
import { Link } from 'react-router-dom';
import './Cart.css';

class Cart extends Component {
    
    componentDidMount() {
        this.props.getCart()
    }

    completePurchase = () => {
        alert('Congratulations, the wand has chosen you! Thank you for your purchase.')
        this.props.clearCart()
    }
    
    render() {
        return (
            <div>
                <Link to='/dashboard'><button>Continue Shopping</button></Link>
                {this.props.cart.map((e, i) => {
                    return (
                        <div key={`${e.product_id}-${i}`} className='card-container'>
                            <div>
                                <div className='product-image'>
                                    <img src={e.product_img} alt='Product Image' style={{maxWidth: '200px'}} />
                                </div>
                                <div className='product-info'>
                                    <span>{e.product_name}</span>
                                    <span>{`$${e.product_price}`}</span>
                                    <span>{e.product_desc}</span>
                                </div>
                            </div>
                            <div className='product-buttons'>
                                <button onClick={() => this.props.removeFromCart(e.product_id)}>Remove From Cart</button>
                            </div>
                        </div>
                    )
                })}
                <Link to='/dashboard'><button onClick={this.completePurchase}>{`Complete Your Purchase ($${this.props.cart.reduce((t, e) => t += e.product_price, 0)})`}</button></Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    cart: reduxState.cartReducer.cart
})

export default connect(mapStateToProps, {
    removeFromCart,
    clearCart,
    getCart
})(Cart)