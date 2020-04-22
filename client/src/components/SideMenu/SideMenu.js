import React, { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductsContext } from '../../context/state/ProductsState'
import { AuthContext } from '../../context/state/AuthState'
import { scrollToTop } from '../../Utils/Utils';

import './SideMenu.scss'
import { SideMenuLoader } from '../SideMenuLoader/SideMenuLoader';


export const SideMenu = () => {
    const { activeCustomer } = useContext(AuthContext)
    const { categories, currentPageCategory, resetProducts, setPageCategory } = useContext(ProductsContext)
    let { routeCategory } = useParams()

    useEffect(() => {
    }, [currentPageCategory, activeCustomer])


    const authAreaBottom = (
        <>
            <Link to='/user/settings'>
                <li><i className='fas fa-xs fa-user-cog'> </i> Personal Details</li>
            </Link>
            <Link to='/sign-out'>
                <li><i className='fas  fa-sign-out-alt'> </i> Sign Out</li>
            </Link>
        </>
    )

    const handleClick = category => {
        scrollToTop()
        resetProducts()
        setPageCategory(category.route)
    }

    if(categories.length === 0) return <SideMenuLoader />

    return (
        <aside className="side-menu">
            <ul>
                {categories.map((category, i) => {
                    return (
                        <Link key={i} onClick={()=>handleClick(category)} to={`/shop/${category.route}`}>
                            <li className={(routeCategory === category.route) ?
                                    "active"
                                    :
                                    ""}
                                    >
                                <i className={`fas fa-xs fa-${category.icon}`}> </i>{category.name}
                            </li>
                        </Link>
                    )
                })}
            </ul>

            {/* CUSTOMER SERVICES */}

            <h4>Customer Services</h4>
            <ul className="mobile-navbar-menu-top">
                <Link to="/contact-us">
                    <li><i className="fas fa-concierge-bell"></i> Contact</li>
                    </Link>
                {activeCustomer && authAreaBottom}
            </ul>
        </aside>
    )
}