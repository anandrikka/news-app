import React, {Component} from 'react';
// import config from 'config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as NewsActions from '../actions/news-actions';

class HomeComponent extends Component {
  // let children = React.cloneElement(this.props.children, this.props);
  constructor(props) {
    super(props);
    this.props.actions.loadArticles('all');
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      bottomIndex: 15
    }
  }

  componentDidMount() {
    //this.props.actions.loadArticles(this.props.news.system.countryCode);
  }
  

  loadMore() {
    this.setState({
      bottomIndex: this.state.bottomIndex + 15
    });
  }

  render() {
    let articles = JSON.parse(JSON.stringify(this.props.news.articles.list));
    if (articles.length > 0) {
      if (this.state.bottomIndex < articles.length) {
        articles = articles.splice(0, this.state.bottomIndex);
      }
      return (
        <div className="container">
          {}  
          <div className="row card-stack">
            {
              articles.map((article, index) => {
                const styles = {
                  bkImage: {
                    backgroundImage: 'url(' + article.urlToImage + ')'
                  }
                }
                return (
                  <div className="col s12" key={index}>
                    <div className="card newscard card-panel hoverable pointer">
                      <div className="row">
                        <div className="col s12 m5">
                          {
                            article.urlToImage ? (<div className="newscard-img" style={styles.bkImage} />) : (
                              <div className="newscard-img"/>
                            ) 
                          }
                        </div>
                        <div className="hide-on-med-and-up" style={{height: '15px'}}></div>
                        <div className="col s12 m7">
                          <div className="card-stacked">
                              <div className="card-content news-content">
                                <h5 className="title">{article.title}</h5>
                                <p className="published">
                                  Published by <b>{article.author || 'NA'}</b> at {article.publishedAt}
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
            this.state.bottomIndex < this.props.news.articles.list.length &&  
            <div className="row">
              <div className="col s12 center-align">
                <button className="waves-effect btn" onClick={this.loadMore}>LOAD MORE</button>  
              </div>
            </div>
          }
          
        </div>
      );
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
