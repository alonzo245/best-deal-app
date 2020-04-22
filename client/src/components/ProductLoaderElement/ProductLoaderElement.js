
import React from 'react'
import './ProductLoaderElement.scss'

export const ProductLoaderElement = ({ items = 0 }) => {

    const handleItems = items => {
         return Array.from({length: items}, (v, i) => i+1)
    }

    if (!items) return null
    return (
        <>
            {handleItems(items).map((item, i) => (
                <li key={i} className="product-card-loader">
                    <div className="product-main">
                        <span className="product-category-badge"> </span>
                        <div className="product-main-image"></div>
                        <div className="prodcut-details-content">
                            <div className="product-details"></div>
                            <div className="price"></div>
                        </div>
                    </div>

                    <div className="btn btn-add-to-cart"></div>
                </li>
            ))}
        </>
    )
}