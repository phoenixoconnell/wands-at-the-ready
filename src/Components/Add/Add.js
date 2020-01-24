import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../redux/reducers/productReducer';
import { Link } from 'react-router-dom';
import './Add.css';
require('dotenv').config();

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

    clear = () => {
        this.setState({
            product_name: '',
            product_img: '',
            product_price: 0,
            product_desc: ''
        })
    }

    submit = product => {
        this.props.addProduct(product)
        this.clear()
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
        this.setState({ product_img: resultEvent.info.url })
        }   
    }

    render() {
        let product = {
            product_name: this.state.product_name,
            product_img: this.state.product_img,
            product_price: this.state.product_price,
            product_desc: this.state.product_desc
        }
        let widget 
        if(window.cloudinary) {
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: `${process.env.REACT_APP_cloudName}`,
                    uploadPreset: `${process.env.REACT_APP_uploadPreset}`,
                    sources: ["local", "url", "facebook", "instagram"],
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result)
                    this.checkUploadResult(error, result)
                })
    }
        return (
            <div className='add-container'>
                <h1>Add New Product</h1>
                <input name='product_name' placeholder='Product Name' onChange={this.handleInputChange} />
                <input name='product_img' placeholder='Product Image' onChange={this.handleInputChange} />
                <input name='product_price' placeholder='Product Price' onChange={this.handleInputChange} />
                <input name='product_desc' placeholder='Product Description' onChange={this.handleInputChange} />
                <div>
                    <button onClick={() => widget.open()}>Select Image</button>
                </div>
                <div>
                    <Link to='/dashboard'><button onClick={() => this.submit(product)}>Add Product</button></Link>
                    <Link to='/dashboard'><button onClick={this.clear}>Cancel</button></Link>
                </div>
            </div>
        )
    }
}


export default connect(undefined, {
    addProduct
})(Add)