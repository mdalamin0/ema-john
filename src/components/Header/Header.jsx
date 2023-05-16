import React, { useContext } from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'
import { Link } from 'react-router-dom';
import ActiveLink from '../ActiveLink/ActiveLink';
import { AuthContext } from '../../Provider/AuthProvider';

const Header = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const handleLogOUt = () => {
        logOutUser()
        .then(result => {

        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <nav style={{ backgroundColor: '#1C2B35' }} className="navbar navbar-expand-lg">
            <div className="container">
                <img src={logo} alt="" />
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 px- mb-lg-0 menu">
                        <li className="nav-item">
                            <ActiveLink className="nav-link" aria-current="page" to="/">Shop</ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink className="nav-link " to="/orders">Order Review</ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink className="nav-link" to="/inventory">Manage Inventory</ActiveLink>
                        </li>
                        {user ? <li className="nav-item">
                            <button onClick={handleLogOUt} className='nav-link text-white'>Log Out</button>
                        </li> :
                            <li className="nav-item">
                                <ActiveLink className="nav-link" to="/login">Login</ActiveLink>
                            </li>}
                        <li className="nav-item">
                            <ActiveLink className="nav-link" to="/register">Sign Up</ActiveLink>
                        </li>
                        <li className='nav-link text-white'>{user?.displayName}</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;