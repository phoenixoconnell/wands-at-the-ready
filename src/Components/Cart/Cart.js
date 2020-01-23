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
                <div className='cart-continue-button'>
                    <Link to='/dashboard'><button>Continue Shopping</button></Link>
                </div>
                <div className='cart-item-container'>
                {this.props.cart.map((e, i) => {
                    return (
                        <div key={`${e.product_id}-${i}`} className='cart-card-container'>
                            <div>
                                <div className='product-image'>
                                    <img src={e.product_img} alt='Product Image' style={{maxWidth: '200px'}} />
                                </div>
                                <div className='product-info'>
                                    <span>{e.product_name}</span>
                                    <span><span className='normal-text'>$</span>{`${e.product_price}`}</span>
                                    <span>{e.product_desc}</span>
                                </div>
                            </div>
                            <div className='cart-product-buttons'>
                                <button className='cart-product-button' onClick={() => this.props.removeFromCart(e.product_id)}>Remove From Cart</button>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className='cart-complete-button'>
                    <Link to='/dashboard'><button onClick={this.completePurchase}>Complete Your Purchase (<span className='normal-text'>$</span>{`${this.props.cart.reduce((t, e) => t += e.product_price, 0)})`}</button></Link>
                </div>
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