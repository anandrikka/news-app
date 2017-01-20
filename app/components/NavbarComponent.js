import React, {Component} from 'react'

class Navbar extends Component {
    
    openNav = () => {
        document.getElementById('sidenav').style.width = '250px';
    }

    closeNav = () => {
        document.getElementById('sidenav').style.width = '0';
    }

    render () {
        return (
            <header>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo center"><h4>News 24x7</h4></a>
                            <i className="left material-icons" style={{ fontSize: '2rem' }}
                                onClick={this.openNav}>menu</i>
                        </div>
                    </nav>
                </div>
                <div id="sidenav" className="sidenav">
                    <a href="javascript:void(0)"
                        className="closebtn material-icons" onClick={this.closeNav}>chevron_left</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
            </header>
        )
    }
}

export default Navbar;