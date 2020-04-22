import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/state/GlobalState'
import { AuthContext } from '../../context/state/AuthState'
import { ProductsContext } from '../../context/state/ProductsState'
import { scrollToTop } from '../../Utils/Utils'
import './MobileNav.scss'


export const MobileNav = () => {
    const { toggleMenu, showMenu } = useContext(GlobalContext)
    const { categories, resetProducts, setPageCategory} = useContext(ProductsContext)
    const { activeCustomer } = useContext(AuthContext)

    useEffect(() => {
    }, [categories.length, activeCustomer])

    const authAreaBottom = (
        <>
            <Link onClick={() => { toggleMenu(); scrollToTop() }} to='/user/settings'>
                <li><i className='fas fa-xs fa-user-cog'> </i> Personal Details</li>
            </Link>
            <Link onClick={() => { toggleMenu(); scrollToTop() }} to='/sign-out'>
                <li><i className='fas fa-xs fa-sign-out-alt'> </i> Sign Out</li>
            </Link>
        </>
    )

    const handleClick = category => {
        scrollToTop()
        setPageCategory(category)
        resetProducts()
        toggleMenu()
    }

    return (
        <nav className={!showMenu ? "mobile-navbar" : "mobile-navbar show"}>
            <ul className="mobile-navbar-menu-top">
                <li className="mobile-navbar-menu-section-title">
                    {activeCustomer ? `Hi, ${activeCustomer.fullName}` : `Categories`}
                </li>
                {categories.map((category, i) => (
                    <Link key={i} onClick={handleClick} to={`/shop/${category.route}`}>
                        <li><i className={`fas fa-xs fa-${category.icon}`}> </i> {category.name}</li>
                    </Link>
                ))}
            </ul>

            {/* CUSTOMER SERVICES */}

            <ul className="mobile-navbar-menu-top">
                <li className="mobile-navbar-menu-section-title">Other Services</li>



                {activeCustomer && authAreaBottom}

                <Link onClick={() => toggleMenu()} to="/contact-us">
                    <li><i className="fas fa-concierge-bell"></i> Contact</li>
                </Link>
            </ul>
        </nav>
    )
}