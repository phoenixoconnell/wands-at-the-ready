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
                <section>
                    <img src={logo} alt='Wands at the Ready!'/>
                </section>
                <div className='landing-input'>
                    <input name='username' placeholder='Username' onChange={this.handleInputChange}></input>
                    <input type='password' name='password' placeholder='Password' onChange={this.handleInputChange}></input>
                </div>
                <div className='landing-admin'>
                    Admin<input type='checkbox' onChange={this.handleBoxClick} />
                </div>
                <div className='landing-buttons'>
                    <Link to='/dashboard'><button onClick={() => this.props.login(auth)}>Login</button></Link>
                    <button onClick={() => this.props.register(register)}>Register</button>
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