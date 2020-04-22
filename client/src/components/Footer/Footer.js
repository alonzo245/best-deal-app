import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'
import logo from '../../assets/images/logo.png'
import { scrollToTop } from '../../Utils/Utils'


export const Footer = () => {
    return (
        <footer className="footer">
            <div>
                <Link to='/' onClick={() => scrollToTop()}><img src={logo} alt="" /></Link>
            </div>
            <ul>
                <li>© All rights Reserved</li>
            </ul>
        </footer>
    )
}