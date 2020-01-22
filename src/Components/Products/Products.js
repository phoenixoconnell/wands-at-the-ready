import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../redux/reducers/productReducer';
import { addToCart } from '../../redux/reducers/cartReducer';
import './Products.css';

class Products extends Component {

    add = product_id => {
        console.log('This is the product id', product_id)
        this.props.addToCart(product_id)
    }

    render() {
        return (
            <div className='products-container'>
                {this.props.isAdmin ? 
                    (
                        <div className='products-add-button'>
                            <Link to='/dashboard/add'><button>Add Product</button></Link>
                        </div>
                    )
                :
                    null
                }
                <div className='products-products'>
                {this.props.products.map(e => {
                    return (
                        <div key={e.product_id} className='card-container'>
                            <Link to={`/dashboard/${e.product_id}`}>
                            <div>
                                <div className='product-image'>
                                    <img src={e.product_img} alt='Product Image' style={{maxWidth: '200px'}} />
                                </div>
                                <div className='product-info'>
                                    <span>{e.product_name}</span>
                                    <span><span className='normal-text'>$</span>{`${e.product_price}`}</span>
                                    {/* <span>{e.product_desc}</span> */}
                                </div>
                            </div>
                            </Link>
                            <div className='products-buttons'>
                                {this.props.isAdmin ? <Link to={`/dashboard/edit/${e.product_id}`}><button>Edit</button></Link> : null} 
                                <button onClick={() => this.add(e.product_id)}>Purchase</button>
                                {this.props.isAdmin ? <button onClick={() => this.props.deleteProduct(e.product_id)}>Delete</button> : null}
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    products: reduxState.productReducer.products,
    isAdmin: reduxState.userReducer.isAdmin,
    loading: reduxState.productReducer.loading
})

export default connect(mapStateToProps, {
    deleteProduct,
    addToCart
})(Products)