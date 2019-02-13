import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            list: []
        };
      }

    // Fetch all the lists from the database
    componentDidMount(){
        axios.get('/api/users/list')
        .then(response => {
            this.setState({ list: response.data });
            console.log(response.data);
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const userIsAuthenticated = (
           <div>
                <br/>
                <br/>
                <div className="alert alert-success">
                    Greetings, {user.name}! You are logged in!
                    <br/>
                </div>
           </div>
        )
        const userIsNotAuthenticated = (
            <div>
                <br/>
                <br/>
                <div className="alert alert-warning">
                    Greetings, guest! You are not logged in!
                </div>
            </div>
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        { isAuthenticated ? userIsAuthenticated : userIsNotAuthenticated }
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Home));