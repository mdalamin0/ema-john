import React from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    return (
        <nav style={{backgroundColor: '#1C2B35'}} className="navbar navbar-expand-lg">
            <div className="container">
                <img src={logo} alt="" />
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 px- mb-lg-0 menu">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Order</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Order Review</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Manage Inventory</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;