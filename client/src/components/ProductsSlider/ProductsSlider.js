import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import { ProductsContext } from '../../context/state/ProductsState'
import { ProductCard } from "../ProductCard/ProductCard";
import './ProductsSlider.scss'

export const ProductsSlider = ({settings}) => {
    const { sliderProducts, getSliderProducts } = useContext(ProductsContext)

    useEffect(() => {
        getSliderProducts()
    }, [])

    if (sliderProducts.length === 0) return null

    return (
        <section className="slider-wrapper">
            <h3>Popular Products</h3>
            <Slider className="slider" {...settings}>
                {sliderProducts.map((product, i) => (
                    <ProductCard key={i} product={product} />
                ))}
            </Slider>
        </section>
    )
}