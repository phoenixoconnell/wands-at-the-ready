import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Products.css';

class Products extends Component {
    render() {
        return (
            <div>
                {this.props.products.map(e => {
                    return (
                        <div key={e.product_id}>
                            <div>
                                <div>
                                    <img src={e.product_img} alt='Product Image' />
                                </div>
                                <div>
                                    <span>{e.product_name}</span>
                                    <span>{e.product_price}</span>
                                    <span>{e.product_desc}</span>
                                </div>
                            </div>
                            <div>
                                {this.props.isAdmin ? <Link to={`/dashboard/edit/${e.product_id}`}><button>Edit</button></Link> : null} 
                                <button>Purchase</button>
                                {this.props.isAdmin ? <button>Delete</button> : null}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    products: reduxState.productReducer.products,
    isAdmin: reduxState.userReducer.isAdmin
})

export default connect(mapStateToProps)(Products)