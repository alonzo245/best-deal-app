import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/state/GlobalState'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import { CartBadge } from '../CartBadge/CartBadge'
import { scrollToTop } from '../../Utils/Utils'
import { UserMenu } from '../UserMenu/UserMenu'
import './Nav.scss'
import logo from '../../assets/images/logo.png'

export const Nav = () => {
    const { toggleMenu } = useContext(GlobalContext)

    return (
        <nav className="navbar">
            <ul className="left-menu">
                <li className="nav-link show-in-tablet" onClick={toggleMenu}>
                    <i className="menu-btn fas fa-bars fa-2x"></i>
                </li>
                <Link to="/" onClick={() => scrollToTop()}><li className=""><img src={logo} alt="" /></li></Link>
            </ul>

            <ul className="right-menu">
                <li className="nav-link"><CartBadge /></li>
                <UserMenu />
                <li><ThemeButton btnClassName="theme-button" /></li>
            </ul>
        </nav>
    )
}