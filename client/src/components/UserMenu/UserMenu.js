import React, { useEffect, useContext, useState } from 'react'
import './UserMenu.scss'
import { AuthContext } from '../../context/state/AuthState'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/state/GlobalState'
// import { AlertTop } from '../AlertTop/AlertTop'

export const UserMenu = () => {
    const { activeCustomer } = useContext(AuthContext)
    const { toggleModal, activateAlertTop } = useContext(GlobalContext)
    const { signOut } = useContext(AuthContext)
    const [toggleUserMenu, setToggleUserMenu] = useState(false)

    useEffect(() => {
        // toggleModal('signIn')
    }, [activeCustomer, toggleUserMenu])

    const handleToggleUserMenu = () => {
        setToggleUserMenu(!toggleUserMenu)
    }

    const handleSignOut = () => {
        signOut()
        handleToggleUserMenu()
        activateAlertTop({ title: 'You have Signed Out.', color: 'blue' })
    }

    if (!activeCustomer) return (
        <>
        <li className="user-nav-badge" onClick={() => toggleModal('signIn')}>
            <i className="menu-btn fas fa-user"></i>
        </li>
        </>
        )

    return (
        <li onClick={handleToggleUserMenu} className="user-nav-badge">
            {activeCustomer.avatar ?
                <img src={`//localhost/uploads/${activeCustomer.avatar}`} alt="user" />
                :
                <i className="menu-btn fas fa-user-cog"></i>
            }


            <ul className={toggleUserMenu ? "nav-user-menu show" : "nav-user-menu"}>
                <Link onClick={() => { handleToggleUserMenu(); }} to="/cart">
                    <li><i className="fas fa-shopping-cart"></i> My Cart</li>
                </Link>
                <Link onClick={() => { handleToggleUserMenu(); }} to="/checkout">
                    <li><i className="fas fa-money-check"></i> Checkout</li>
                </Link>
                <Link onClick={handleToggleUserMenu} to="/user/orders" >
                    <li>
                        <i className="fas fa-history"></i> Orders History
                 </li>
                </Link>
                <Link onClick={handleToggleUserMenu} to="/user/settings" >
                    <li>
                        <i className="fas fa-user-cog"></i> Info
                </li>
                </Link>

                <Link onClick={() => { handleToggleUserMenu(); }} to="/contact-us">
                    <li><i className="fas fa-concierge-bell"></i> Contact</li>
                </Link>
                <Link onClick={handleSignOut} to="" >
                    <li >
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                </li>
                </Link>
            </ul>

        </li>
    )
}