import React, { Component } from 'react';
import { connect } from 'react-redux';
import Add from '../Add/Add';
import { logout } from '../../redux/reducers/userReducer';
import './Dashboard.css';
import Products from '../Products/Products';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends Component {
    
    componentDidMount() {
        if(!this.props.user_id) {
            // alert('Please enter a valid username and password')
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <section>
                    <h1>Dashboard</h1>
                    <Link to='/'><button onClick={this.props.logout}>Logout</button></Link>
                </section>
                {this.props.isAdmin ? 
                    (
                        <div>
                            <button>Add Product</button>
                            <button>Edit Product</button>
                        </div>
                    )
                :
                    null
                }
                <section>
                    <Products />
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.userReducer.user_id,
        username: reduxState.userReducer.username,
        isAdmin: reduxState.userReducer.isAdmin
    }
}

export default connect(mapStateToProps, {
    logout
})(withRouter(Dashboard))
