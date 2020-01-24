import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProduct, getProduct } from '../../redux/reducers/productReducer';
import { Link } from 'react-router-dom';
import './Edit.css';
require('dotenv').config();

class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            product_name: '',
            product_img: '',
            product_price: 0,
            product_desc: '',
            loaded: false
        }
    }

    componentDidMount() {
        console.log('loading')
        this.props.getProduct(this.props.match.params.product_id)
    }

    componentDidUpdate(prevProps) {
        console.log('setting')
        if(!this.state.loading && this.props.product != prevProps.product) {
            console.log(this.props.product)
            this.setState({
                product_name: this.props.product.product_name,
                product_img: this.props.product.product_img,
                product_price: this.props.product.product_price,
                product_desc: this.props.product.product_desc,
                loaded: true
            })
        }
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
        this.setState({ product_img: resultEvent.info.url })
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
            <div>
                <h1>Edit Product</h1>
                <input name='product_name' onChange={this.handleInputChange} value={this.state.product_name} />
                <input name='product_img' onChange={this.handleInputChange} value={this.state.product_img} />
                <input name='product_price' onChange={this.handleInputChange} value={this.state.product_price} />
                <input name='product_desc' onChange={this.handleInputChange} value={this.state.product_desc} />
                <div>
                    <button onClick={() => widget.open()}>Select Image</button>
                </div>
                <div>
                    <Link to='/dashboard'><button onClick={() => this.props.editProduct(product, this.props.product.product_id)}>Edit Product</button></Link>
                    <Link to='/dashboard'><button>Cancel</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    product: reduxState.productReducer.product,
    loading: false
})

export default connect(mapStateToProps, {
    editProduct,
    getProduct
})(Edit)