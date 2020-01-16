import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/userReducer';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let auth = {
            username: this.state.username,
            password: this.state.password
        }
        return (
            <div>
                <input name='username' onChange={this.handleInputChange}></input>
                <input name='password' onChange={this.handleInputChange}></input>
                <Link to='/dashboard'><button onClick={() => this.props.login(auth)}>Login</button></Link>
            </div>
        )
    }
}

export default connect(undefined, {
    login
})(Landing)