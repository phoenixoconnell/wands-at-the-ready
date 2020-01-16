import React, { Component } from 'react';
import { connect } from 'react-redux';
import Add from '../Add/Add';
import './Dashboard.css';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Add />
            </div>
        )
    }
}
