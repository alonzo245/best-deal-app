import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
    useEffect(() => {
    }, [])

    return (
        <header className="admin-header">
            <nav>
                <ul>
                    <li><NavLink to="/main">Main</NavLink></li>
                    <li><NavLink to="/categories">Category</NavLink></li>
                    <li><NavLink to="/products">Product</NavLink></li>
                    <li><NavLink to="/slider-products">Slider Products</NavLink></li>
                    <li><NavLink to="/hot-products">Hot Products</NavLink></li>
                    <li><NavLink to="/users">Users</NavLink></li>
                    <li><NavLink to="/sign-out">Sign Out</NavLink></li>
                </ul>
            </nav>

            <div className="admin-logo">Admin</div>
        </header>
    )
}