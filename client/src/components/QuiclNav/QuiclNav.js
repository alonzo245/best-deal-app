import React, { useContext } from 'react'
import { ProductsContext } from '../../context/state/ProductsState'
import { Link, useParams } from 'react-router-dom';
import { scrollToTop } from '../../Utils/Utils';
import './QuiclNav.scss'

export const QuiclNav = () => {
    let { routeCategory } = useParams()
    const { categories, resetProducts,setPageCategory } = useContext(ProductsContext)

    if (categories.length === 0) return null

    const handleClick = category => {
        scrollToTop()
        resetProducts()
        setPageCategory(category.route)
    }

    return (
        <aside className="quick-nav-wrapper">
            <ul className="quick-nav">
                {categories.map((category, i) => {
                    return (
                        <Link key={i} onClick={()=>handleClick(category)} to={`/shop/${category.route}`} >
                            <li onClick={handleClick}
                                className={(routeCategory === category.route) ?
                                    "active"
                                    :
                                    ""}
                            >
                                {category.name}
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </aside>
    )
}