import React, {Component} from 'react'

class FooterComponent extends Component {
    render () {
        return (
            <footer className="page-footer">
                <div className="footer-copyright">
                    <div className="container">
                        © 2017 News24x7 - Powered by  <a style={{color: 'rgba(255, 255, 255, 0.8)'}} href="https://newsapi.org" target="_blank">NewsAPI.org</a>
                    <a className="grey-text text-lighten-4 right" href="https://techanand.wordpress.com" target="_blank">email: appsbyanand@gmail.com</a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;