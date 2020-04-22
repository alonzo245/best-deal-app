import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/state/CartState'
import { GlobalContext } from '../../context/state/GlobalState'

import './CartBadge.scss'
import { scrollToTop } from '../../Utils/Utils';
import { AuthContext } from '../../context/state/AuthState';
import { ProductsContext } from '../../context/state/ProductsState';

export const CartBadge = () => {
    const { toggleAuthScreen, activeCustomer } = useContext(AuthContext)
    const { cart, removeProduct } = useContext(CartContext)
    const { animateCart } = useContext(GlobalContext)
    const { categories } = useContext(ProductsContext)


    useEffect(() => {
    }, [animateCart])

    if (!Array.isArray(cart)) return (<div></div>)
    return (
        <>
            <Link to={"/cart"} onClick={() => scrollToTop()} className={animateCart ? "animate grow" : "animate"}>
                
            <span> {cart.reduce((result, product) => {
                    return result + product.price * product.quantity
                }, 0)}$
                </span>  <i className="fas fa-shopping-basket"></i> ({cart.length})
            </Link>

            <div className="cart-popup">
                <ul className="cart-popup-list">
                    {cart.map((product, i) => {
                        let category = categories.filter(category => category.categoryId === product.categoryId)[0]

                        return (
                            <li key={i}>
                                <Link to={`/shop/${category.route}/${product.route}`} className="left-popup-details">
                                    <img className="right-popup-image" src={product.image} alt={product.name} />
                                    <h5>{product.name}</h5>
                                </Link>
                                <div className="right-popup-details">
                                    <span>({product.quantity}) {product.price}$</span> <a className="btn" onClick={() => removeProduct(product.productId)}>Remove</a>
                                </div>
                            </li>
                        )
                    }
                    )}
                </ul>
                {
                    activeCustomer ?
                        <Link className="btn checkout-cart-popup-btn" to="/checkout">
                            Proceed To Checkout <i className="fas fa-shopping-basket "></i>
                        </Link>
                        :
                        <Link onClick={toggleAuthScreen} className="btn checkout-cart-popup-btn" to="">
                            Proceed To Checkout <i className="fas fa-shopping-basket "></i>
                        </Link>
                }
            </div>
        </>

    )
}