import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../components/NavbarComponent';
import Footer from '../components/FooterComponent';
import * as newsActions from '../actions/news-actions';
import * as containerActions from '../actions/container-actions';

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.props.actions.systemDetails();
        this.props.actions.getCategories();
        this.props.actions.getSources();
    }

    render() {
        return (
            <div id="main">
                <Navbar {...this.props.app} actions={this.props.actions}/>
                <div id="appContainer">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

const actions = Object.assign({}, containerActions, newsActions);

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(state => state, mapDispatchToProps)(MainContainer);