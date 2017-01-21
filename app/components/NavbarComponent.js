import React, {Component} from 'react'

class Navbar extends Component {
    
    constructor(props) {
        super(props);
        this.loadByCategory = this.loadByCategory.bind(this);
    }

    openNav = () => {
        document.getElementById('sidenav').style.width = '250px';
    }

    closeNav = () => {
        document.getElementById('sidenav').style.width = '0';
    }

    loadByCategory(category) {
        const { system } = this.props;
        this.props.actions.loadArticles(category, system.countryCode);
        this.closeNav();
    }

    render() {
        const categories = this.props.categories;
        const system = this.props.system || {};
        return (
            <header>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo center"><h4>News 24x7</h4></a>
                            <i className="left material-icons pointer" style={{ fontSize: '2rem', paddingLeft: '16px' }}
                                onClick={this.openNav}>menu</i>
                        </div>
                    </nav>
                </div>
                <div id="sidenav" className="sidenav teal z-depth-1">
                    <a href="javascript:void(0)"
                        className="closebtn material-icons" onClick={this.closeNav}>chevron_left</a>    
                    <div className="container">
                        <h5>{system.countryName} | English</h5>
                        {/*<h5>Categories</h5>*/}
                        <ul>
                            <li key={-1} onClick={() => this.loadByCategory('all')}>{'ALL'}</li>
                            {
                                categories.map((category, index) => {
                                    return <li key={index} onClick={() => this.loadByCategory(category)}>{category.toUpperCase()}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;