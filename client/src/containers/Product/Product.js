import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../../context/state/ProductsState'
import { GlobalContext } from '../../context/state/GlobalState'
import { CartContext } from '../../context/state/CartState'
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider'
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import sliderSettings from './sliderSettings'
import { CategoriesList } from '../../components/CategoriesList/CategoriesList'
import './Product.scss'


export const Product = () => {
    const { product, getProduct, setPageCategory, currentPageCategory } = useContext(ProductsContext)
    const { addProduct } = useContext(CartContext)
    const { handleAnimateCart } = useContext(GlobalContext)
    let { routeCategory, routeProductName } = useParams()
    useEffect(() => {
        getProduct(routeProductName)
        setPageCategory(routeCategory)
    }, [routeProductName, currentPageCategory])

    if (!product) return null
    return (
        <section className="main-content-product">

            <div className="product-wrapper">
                <div className="product-braed-crumb">
                    <BreadCrumbs category={currentPageCategory} product={product} />
                </div>

                <div className="product-side-menu">
                    <SideMenu />
                </div>

                <figure className="product-page-image">
                    {product.special && <span className="product-special-badge">{product.special}</span>}
                    <img src={product.image} alt={product.name} />
                </figure>


                <div className="product-page-main">
                    <div className="product-page-title">
                        <h1 className="p-title">{product.name}</h1>
                        <div className="p-rating">
                            Rating: {Array.from(Array(+product.rating), (_, i) => (
                            <i key={i} className="fas fa-xs fa-star"></i>)
                        )}
                        </div>
                    </div>
                    <div className="p-price">
                        Price: {product.price}$ {product.oldPrice && <span className="old-price"> {product.oldPrice}$</span>}
                    </div>
                </div>

                <div className="product-page-desc">
                    <p className="">{product.description}</p>
                    <a className="btn btn-add-to-cart-product" onClick={() => {
                        handleAnimateCart()
                        addProduct(product)
                    }}>Add to cart</a>

                </div>
            </div>

            <ProductsSlider settings={sliderSettings} />
            <CategoriesList />
        </section>
    )
}