import React, {Component} from 'react';
// import config from 'config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as NewsActions from '../actions/news-actions';

class HomeComponent extends Component {
  // let children = React.cloneElement(this.props.children, this.props);
  constructor(props) {
    super(props);
    this.props.actions.loadArticles();
  }

  componentDidMount() {
    //this.props.actions.loadArticles(this.props.news.system.countryCode);
  }
  

  loadMore(loadFromKey) {
    console.log('loadFromKey', loadFromKey);
  }

  render() {
    const articles = this.props.news.articles.list;
    return (
      <div className="container">
        <div className="row card-stack">
          {
            articles.map((article, index) => {
              const styles = {
                bkImage: {
                  backgroundImage: 'url(' + article.urlToImage + ')'
                },
                stackedHeight: {
                  height: '284px'
                }
              }
              return (
                <div className="col s12" key={index}>
                  <div className="card">
                    <div className="row">
                      <div className="col s12 m4">
                        <div className="newscard-img" style={styles.bkImage}/>
                      </div>
                      <div className="col s12 m8">
                        <div className="card-stacked" style={styles.stackedHeight}>
                            <div className="card-content news-content">
                            <h5>{article.title}</h5>
                            <label>{}</label>
                            <p>{article.description}</p>
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
        <div className="row">
          <div className="col s12 center-align">
            <button className="waves-effect btn" onClick={this.loadMore}>LOAD MORE</button>  
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(NewsActions, dispatch) });

export default connect(state => state, mapDispatchToProps)(HomeComponent);
