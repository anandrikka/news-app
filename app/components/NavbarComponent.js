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

    componentDidMount() {
    }
    
    showDropdown() {
        document.getElementById('cdropdown').style.display = 'block';
    }

    loadByCategory(category) {
        this.props.loadByCategory(category);
        this.closeNav();
    }

    loadByCountry(country) {
        this.props.loadByCountry(country);
        this.closeNav();
    }

    render() {
        const categories = this.props.categories;
        const system = this.props.system || {};
        const country = system.countryCode;
        const countries = this.props.countries || [];
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
                    {/*<h5>{system.countryName} | English</h5>*/}
                    {/*<h5>Categories</h5>*/}
                    <div>
                        <div className="countries">
                            <div className="selected" onClick={() => this.loadByCountry(country)}>
                                 <span className={country === this.props.country ? "btn" : "countryClass"}>
                                    {system.countryName ? system.countryName.toUpperCase() : ''}
                                </span>   
                            </div>
                            <div className="rest"
                                onMouseEnter={this.showDropdown}    
                                onClick={() => this.loadByCountry(country)}>
                                <span id="world"
                                    className={country !== this.props.country ? "btn" : "worldClass"}>
                                    WORLD
                                </span>
                                <ul id="cdropdown" className="cdropdown">
                                    {
                                        countries.map((country, index) => {
                                            return <li key={index}><span>{country.name}</span></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="categories">
                        <ul>
                            <li key={-1} onClick={() => this.loadByCategory('all')}>ALL</li>    
                            {
                                categories.map((category, index) => {
                                    const activeClass = category === this.props.category ? 'activeClass' : ''
                                    return <li key={index}
                                        className={activeClass}    
                                        onClick={() => this.loadByCategory(category)}>
                                        {category.toUpperCase()}
                                    </li>
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