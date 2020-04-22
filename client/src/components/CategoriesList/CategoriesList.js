import React, { useContext } from 'react'
import { ProductsContext } from '../../context/state/ProductsState'
import { scrollToTop } from '../../Utils/Utils'
import { Link } from 'react-router-dom';
import './CategoriesList.scss'

export const CategoriesList = () => {
    const { categories } = useContext(ProductsContext)

    return (
        <div className="categories-list">
            <ul>
                {categories.map((category, i) => {
                    return (
                        <Link onClick={scrollToTop} key={i} to={`/shop/${category.route}`} >
                            <li onClick={scrollToTop}>
                                <i className={`fas fa-${category.icon}`}></i>
                                <span>{category.name}</span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}