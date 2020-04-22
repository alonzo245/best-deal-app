import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/state/GlobalState'
import { scrollToTop } from '../../Utils/Utils';
import { ProductsContext } from '../../context/state/ProductsState';
import { CartContext } from '../../context/state/CartState';
import './ProductCard.scss'

export const ProductCard = ({ product, categoryName = 'none'}) => {
    const { handleAnimateCart } = useContext(GlobalContext)
    const { categories } = useContext(ProductsContext)
    const { addProduct } = useContext(CartContext)

    if (categories.length === 0) return null
    let category = categories.filter(category => {
        return category.categoryId === product.categoryId
    })[0]

    return (
        <li className="product-card">
            <Link className="product-main" onClick={() => scrollToTop()} to={`/shop/${category.route}/${product.route}`}>
                <span className="product-category-badge"> {category.name} </span>
                {product.special && <span className="product-special-badge">{product.special}</span>}
                <div className="product-main-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="prodcut-details-content">
                    <div className="product-details">
                        {product.name}
                    </div>
                    <div className="price">
                        {product.oldPrice && <span className="old-price">{product.oldPrice}$</span>}
                        {product.price}$</div>
                </div>
            </Link>

            <a className="btn btn-add-to-cart" onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleAnimateCart()
                addProduct(product)
            }}>
                <i className="fas fa-shopping-cart"></i> Add to cart</a>
        </li>
    )
}


