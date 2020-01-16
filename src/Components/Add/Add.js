import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../redux/reducers/productReducer';
import { Link } from 'react-router-dom';
import './Add.css';

class Add extends Component {
    constructor(){
        super()
        this.state = {
            product_name: '',
            product_img: '',
            product_price: 0,
            product_desc: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let product = {
            product_name: this.state.product_name,
            product_img: this.state.product_img,
            product_price: this.state.product_price,
            product_desc: this.state.product_desc
        }
        return (
            <div>
                <h1>Add Product</h1>
                <input name='product_name' placeholder='Product Name' onChange={this.handleInputChange} />
                <input name='product_img' placeholder='Product Image' onChange={this.handleInputChange} />
                <input name='product_price' placeholder='Product Price' onChange={this.handleInputChange} />
                <input name='product_desc' placeholder='Product Description' onChange={this.handleInputChange} />
                <Link to='/dashboard'><button onClick={() => this.props.addProduct(product)}>Add Product</button></Link>
            </div>
        )
    }
}


export default connect(undefined, {
    addProduct
})(Add)