import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../components/NavbarComponent';
import Footer from '../components/FooterComponent';
import Loading from '../components/LoadingComponent';
import * as newsActions from '../actions/news-actions';
import * as containerActions from '../actions/container-actions';

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.props.actions.systemDetails();
        this.props.actions.getCategories();
        this.props.actions.getSources();
        this.props.actions.getCountries();
        this.loadByCategory = this.loadByCategory.bind(this);
        this.loadByCountry = this.loadByCountry.bind(this);
    }

    loadByCategory(category) {
        const { system } = this.props.app;
        this.props.actions.loadArticles(category, this.props.news.selectedCountry);
    }

    loadByCountry(country) {
        this.props.actions.loadArticles('all', country);
    }

    render() {
        return (
            <div id="main">
                <Loading isLoading={this.props.app.isLoading}></Loading>    
                <Navbar {...this.props.app} loadByCategory={this.loadByCategory}
                    loadByCountry = {this.loadByCountry}
                    actions={this.props.actions}
                    category={this.props.news.selectedCategory}
                    country={this.props.news.selectedCountry}/>
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