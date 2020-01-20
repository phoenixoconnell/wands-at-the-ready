import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, setProduct } from '../../redux/reducers/productReducer';
import './Product.css';

class Product extends Component {
    componentDidMount() {
        this.props.setProduct(this.props.match.params.product_id)
    }
    render() {
        return (
            <div>
                <Link to='/dashboard'><button>Back</button></Link>
                <span>{this.props.product.product_name}</span>
                <img src={this.props.product.product_img} alt='Product Image' />
                <span>{this.props.product.product_price}</span>
                <span>{this.props.product.product_desc}</span>
                <div>
                    {this.props.isAdmin ? <Link to={`/dashboard/edit/${this.props.product.product_id}`}><button>Edit</button></Link> : null}
                    <button>Purchase</button>
                    {this.props.isAdmin ? <Link to='/dashboard'><button onClick={() => this.props.deleteProduct(this.props.product.product_id)}>Delete</button></Link> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps=(reduxState) => ({
    product: reduxState.productReducer.product,
    isAdmin: reduxState.userReducer.isAdmin
})

export default connect(mapStateToProps, {deleteProduct, setProduct})(Product)
