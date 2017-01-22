import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PageNotFound extends Component{
    render() {
        console.log('Page Not Found Rendered');
        return (
            <div className="error-page-wrap">
                <article className="error-page gradient">
                    <hgroup>
                        <h1>404</h1>
                        <h2>oops! page not found</h2>
                    </hgroup>
                    <Link to="/" title="Back to site" className="error-back">Back</Link>
                </article>
            </div>
        )
    }
}