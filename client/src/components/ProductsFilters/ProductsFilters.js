import React, { useEffect, useContext, useState } from 'react'
import { ProductsContext } from '../../context/state/ProductsState'
import './ProductsFilters.scss'

export const ProductsFilters = ({ page }) => {

    const { categoryPageProducts, sortFilter, currentPageCategory } = useContext(ProductsContext)

    const [toggleFilters, setToggleFilters] = useState(false)

    useEffect(() => {
    }, [currentPageCategory, categoryPageProducts])

    const handleToggleFilters = () => {
        setToggleFilters(!toggleFilters)
    }

    if (categoryPageProducts.length === 0) return null
    return (
        <div className="products-filters">
            <i onClick={handleToggleFilters} className="fas fa-filter filter-results-btn"></i>
            <ul className={toggleFilters ? "filters show" : "filters"}>
                <li onClick={() => { sortFilter(); handleToggleFilters(); }}>
                    <i className="fas fa-sort"></i> Clear
                 </li>
                <li onClick={() => { sortFilter('low'); handleToggleFilters(); }}>
                    <i className="fas fa-sort-amount-down"></i> Low-High
                </li>
                <li onClick={() => { sortFilter('high'); handleToggleFilters(); }}>
                    <i className="fas fa-sort-amount-up"></i> High-Low
                </li>
            </ul>
        </div>
    )
}