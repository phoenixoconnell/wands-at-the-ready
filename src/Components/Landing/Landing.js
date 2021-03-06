import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, register } from '../../redux/reducers/userReducer';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import './Landing.css';

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            isAdmin: false
        }
    }

    // componentDidUpdate(prevProps){
        // console.log(this.props)
        // if(this.props.loginError != '' && prevProps.loginError != this.props.loginError) {
        //     this.props.history.push('/dashboard')
        // } else {
        //     alert(this.props.loginError)
        // }
    // }

    handleInputChange = e => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBoxClick = (e) => {
        if(e.target.checked === true){
            this.setState({isAdmin: true})
        } else {
            this.setState({isAdmin: false})
        }
    }

    registerLocal = user => {
        const { username, password, isAdmin } = this.state
        this.setState({
            username: '',
            password: '',
            isAdmin: false
        })
        this.props.register({ username, password, isAdmin })
    }

    render() {
        let auth = {
            username: this.state.username,
            password: this.state.password            
        }
        let register = {
            username: this.state.username,
            password: this.state.password,
            isAdmin: this.state.isAdmin
        }
        return (
            <div className='landing-container'>
                <section className='landing-logo'>
                    <img src={logo} alt='Wands at the Ready!'/>
                </section>
                <div className='landing-input'>
                    <input name='username' placeholder='Username' onChange={this.handleInputChange} value={this.state.username}></input>
                    <input type='password' name='password' placeholder='Password' onChange={this.handleInputChange} value={this.state.password}></input>
                </div>
                <div className='landing-admin'>
                    Admin<input type='checkbox' onChange={this.handleBoxClick} value={this.state.isAdmin} />
                </div>
                <div className='landing-buttons'>
                    <Link to='/dashboard'><button onClick={() => this.props.login(auth)}>Login</button></Link>
                    <button onClick={() => this.registerLocal(register)}>Register</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.userReducer.user_id,
        loginError: reduxState.userReducer.error
    }
}

export default connect(mapStateToProps, {
    login,
    register
})(Landing)