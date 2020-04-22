import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/state/CartState'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { GlobalContext } from '../../context/state/GlobalState'
import { ProductsContext } from '../../context/state/ProductsState'
import './CartList.scss'

export const CartList = ({settings}) => {
    const { cart, getCart, removeProduct, addQuantity, removeQuantity } = useContext(CartContext)
    const { categories } = useContext(ProductsContext)
    const { handleAnimateCart } = useContext(GlobalContext)

    if (cart.length === 0) return (
        <section className="main-content-cart">
            <div className="empty-cart">
                Opps.. Cart is empty
            <br />
                <br />
                <Link to="/" >Back To Shopping</Link>
            </div>
        </section>
    )

    return (
        <ul className="cart-list">
            {cart.map((product, i) => {
                return (
                    <li key={i} className="cart-card">
                        <figure className="p-image">
                            <Link to={`/shop/${categories && categories.filter(category => category.categoryId === product.categoryId)[0].route}/${product.route}`}>
                                <img src={product.image} alt={product.name} />
                            </Link>
                        </figure>

                        <div className="cart-card-middle">
                            <div className="cart-product-headings">
                                <h4 className="p-title">{product.name}</h4>
                                <div className="p-price">{product.price}$</div>
                            </div>
                            {settings.description && <p>{product.description}</p>}
                        </div>

                        <div className="cart-card-right">
                            <i className="fas fa-plus-circle" onClick={() => { addQuantity(product.productId); handleAnimateCart(); }}></i>
                            <span> {product.quantity}</span>
                            <i className="fas fa-minus-circle" onClick={() => { removeQuantity(product.productId); handleAnimateCart(); }}></i>
                            <i className="far fa-1x fa-trash-alt remove-product" onClick={() => { removeProduct(product.productId); handleAnimateCart(); }}></i>
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}