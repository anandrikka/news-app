import React, { Component, PropTypes } from 'react';

class LoadingComponent extends Component {
    render() {
        const displayValue = this.props.isLoading ? 'block' : 'none';
        const splash = this.props.isLoading ? 'splash-screen' : '';
        return (
            <div className={splash}>
                <div className="loadingBar" style={{ display: displayValue }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default LoadingComponent;