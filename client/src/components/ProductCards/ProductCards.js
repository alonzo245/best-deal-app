import React, { useContext, useEffect } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductsContext } from '../../context/state/ProductsState'
import { CartContext } from '../../context/state/CartState'

import './ProductCards.scss'
import { ProductLoaderElement } from '../ProductLoaderElement/ProductLoaderElement'

export const ProductCards = ({ products }) => {
    const { categories } = useContext(ProductsContext)
    const { addProduct } = useContext(CartContext)

    useEffect(() => {
    }, [products])

    if (products.length === 0) return (
        <ul className="products-cards">
            <ProductLoaderElement items={8} />
        </ul>
    )

    return (
        <ul className="products-cards">

            {products.map((product, i) => {
                // if (product.exclude) return null

                let categoryName = categories.filter(category => category.categoryId === product.categoryId)[0]
                let a = categoryName ? categoryName.name : 'NONE'
                return (

                    <ProductCard
                        key={i}
                        product={product}
                        addProduct={addProduct}
                        categoryName={categoryName}
                        categories={categories} />

                )
            })}
        </ul>
    )
}
