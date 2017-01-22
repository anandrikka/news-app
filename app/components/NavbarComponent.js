import React, {Component} from 'react'
import { Link } from 'react-router';
class Navbar extends Component {
    
    constructor(props) {
        super(props);
        this.loadByCategory = this.loadByCategory.bind(this);
        this.loadByCountry = this.loadByCountry.bind(this);
        this.state = {
            dropdownVisible: 'block'
        };
        this.showDropdown = this.showDropdown.bind(this);
    }

    openNav = () => {
        document.getElementById('sidenav').style.width = '250px';
    }

    closeNav = () => {
        document.getElementById('sidenav').style.width = '0';
        document.getElementById('cdropdown').style.display = 'none';
    }

    componentDidMount() {
    }
    
    showDropdown() {
        let dd;
        if (this.state.dropdownVisible === 'block') {
            dd = 'none';
        } else {
            dd = 'block';
        }
        this.setState({
            dropdownVisible: dd
        });
        document.getElementById('cdropdown').style.display = this.state.dropdownVisible;
    }

    loadByCategory(category) {
        this.props.loadByCategory(category);
        this.closeNav();
    }

    loadByCountry(country) {
        this.props.loadByCountry(country);
        this.showDropdown();
        this.closeNav();
    }

    render() {
        const categories = this.props.categories;
        const system = this.props.system || {};
        const country = system.countryCode;
        const countries = this.props.countries || [];
        const countriesMap = {};
        for (let i = 0; i < countries.length; i++) {
            countriesMap[countries[i].code] = countries[i];
        }
        return (
            <header>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <Link to="/" className="brand-logo center"><h4>Daily News</h4></Link>
                            <i className="left material-icons pointer" style={{ fontSize: '2rem', paddingLeft: '16px' }}
                                onClick={this.openNav}>menu</i>
                        </div>
                    </nav>
                </div>
                <div id="sidenav" className="sidenav teal z-depth-1">
                    <a href="javascript:void(0)"
                        className="closebtn material-icons" onClick={this.closeNav}>chevron_left</a>    
                    <div className="countries">
                        <div className="rest">
                            <button className="btn" onClick={this.showDropdown}>
                                {this.props.country && countriesMap[this.props.country].name}
                                <i className="material-icons right"
                                    style={{ marginLeft: 0 }}>expand_more</i>
                            </button>
                            <ul id="cdropdown" className="cdropdown">
                                {
                                    countries.map((country, index) => {
                                        return <li key={index}
                                            onClick={() => this.loadByCountry(country.code)}><span>{country.name}</span></li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="categories">
                        <ul>
                            <li key={-1}><span onClick={() => this.loadByCategory('all')}>ALL</span></li>    
                            {
                                categories.map((category, index) => {
                                    const activeClass = category === this.props.category ? 'activeClass' : ''
                                    return <li key={index}
                                        className={activeClass}>
                                        <span onClick={() => this.loadByCategory(category)}>{category.toUpperCase()}</span>
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