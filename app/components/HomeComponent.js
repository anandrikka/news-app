import React, { Component } from 'react';
// import config from 'config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import moment from 'moment-timezone';

import * as NewsActions from '../actions/news-actions';
import noResultsImg from '../assets/images/no_results.png';

class HomeComponent extends Component {
  // let children = React.cloneElement(this.props.children, this.props);
  constructor(props) {
    super(props);
    this.loadByCategory = this.loadByCategory.bind(this);
  }

  componentDidMount() {
    //this.props.actions.loadArticles('all', this.props.news.selectedCountry);
    //this.props.actions.loadArticles(this.props.news.system.countryCode);
    // var socket = io.connect('http://localhost:3000');
    // socket.on('news', function (data) {
    //   console.log(data);
    // });
  }

  componentWillReceiveProps (nextProps) {
    // let prevProps = this.props;
    // if (prevProps.app.countries.length !== nextProps.app.countries.length ) {
    //   this.props.actions.loadArticles('all', nextProps.news.selectedCountry);
    // }
  }
    


  openUrl(url) {
    if (url) {
      window.open(url, '_blank').focus();
    }
  }

  loadByCategory(category) {
      this.props.actions.loadArticles(category, this.props.news.selectedCountry);
  }

  render() {
    let articles = JSON.parse(JSON.stringify(this.props.news.articles.list));
    let sources = this.props.app.sources;
    if (articles.length > 0) {
      if (this.props.news.bottomIndex < articles.length) {
        articles = articles.splice(0, this.props.news.bottomIndex);
      }
      return (
        <div className="container">
          {}  
          <div className="row card-stack">
            {
              articles.map((article, index) => {
                let urlToImage = article.urlToImage;
                if (!urlToImage) {
                  const sourceDetails = this.props.app.sources[article.source];
                  if (sourceDetails) {
                      urlToImage = sourceDetails.urlsToLogos.large
                  }
                }
                const styles = {
                  bkImage: {
                    backgroundImage: 'url(' + urlToImage + ')'
                  }
                }
                return (
                  <div className="col s12" key={index}>
                    <div className="card newscard card-panel hoverable pointer"
                      onClick={() => this.openUrl(article.url)}>
                      <div className="row">
                        <div className="col s12 m5">
                          {
                            article.urlToImage ? (<div className="newscard-img" style={styles.bkImage} />) : (
                              <div className="newscard-img"
                                style={{ backgroundImage: 'url(' + urlToImage + ')' }}></div>
                            ) 
                          }
                        </div>
                        <div className="hide-on-med-and-up" style={{height: '15px'}}></div>
                        <div className="col s12 m7">
                          <div className="card-stacked">
                              <div className="card-content news-content">
                                <h5 className="title">{article.title}</h5>
                                <p className="published">
                                Published by <b>{article.author || sources[article.source].name}</b> at <b>
                                {moment.tz(article.publishedAt, article.timezone).format('Do MMM YYYY HH:mm z')}</b>
                                </p>
                                <p className="description">{article.description}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          {
            this.props.news.bottomIndex < this.props.news.articles.list.length &&  
            <div className="row">
              <div className="col s12 center-align">
                <button className="waves-effect btn" onClick={this.props.actions.loadMore15}>
                  LOAD MORE</button>  
              </div>
            </div>
          }
          
        </div>
      );
    } else if (articles.length === 0 && !this.props.app.isLoading) {
      return (
        <div>
          <div className="no-results">
            <img src={noResultsImg} />  
          </div>  
          <br />
          {
            this.props.app.categories.map((category, index) => {
              return <button style={{margin: '16px'}} key={index} className="hide-on-small-only btn waves-effect waves-light"
                onClick={() => this.loadByCategory(category)}>
                {category.toUpperCase()}
              </button>
            })
          }
        </div>
      )
    }
    return <div>Loding...</div>
  }
}

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    app
  };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(NewsActions, dispatch) });

export default connect(state => state, mapDispatchToProps)(HomeComponent);
