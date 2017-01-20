import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../components/NavbarComponent';
import Footer from '../components/FooterComponent';
import * as NewsActions from '../actions/news-actions';

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.props.actions.systemDetails();
    }

    render() {
        return (
            <div id="main">
                <Navbar />
                <div id="appContainer">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(NewsActions, dispatch) });

export default connect(state => state, mapDispatchToProps)(MainContainer);