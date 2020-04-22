import React, { useContext } from 'react'
import { CartContext } from '../../context/state/CartState'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import { scrollToTop } from '../../Utils/Utils'
import { CartList } from '../../components/CartList/CartList'
import { AuthContext } from '../../context/state/AuthState'
import './Cart.scss'

export const Cart = () => {
    const { toggleAuthScreen, activeCustomer } = useContext(AuthContext)
    const { cart } = useContext(CartContext)

    if (cart.length === 0) return (
        <section className="main-content-cart">
            <div className="empty-cart">
                Opps.. Cart is empty
            <br />
                <br />
                <Link to="/shop" >Back To Shopping</Link>
            </div>
        </section>
    )

    return (
        <section className="main-content-cart">
            <h1><i className="fas fa-shopping-cart"></i> Cart</h1>
            <div className="cart-main">
                <SideMenu />
                <CartList settings={{ description: true }} />

                <div className="cart-details">
                    <div className="cart-sum-main">
                        <span>Total In Cart: {
                            cart.reduce((result, product) => {
                                return result + product.price * product.quantity
                            }, 0)
                        }$</span>
                    </div>
                    {
                        activeCustomer ?
                            <Link onClick={() => scrollToTop()} className="btn cart-proceed-to-checkout-btn" to="/checkout">
                                Proceed To Checkout <i className="fas fa-shopping-basket "></i>
                            </Link>
                            :
                            <div onClick={()=>{scrollToTop(); toggleAuthScreen();}} className="btn cart-proceed-to-checkout-btn" to="">
                                Proceed To Checkout <i className="fas fa-shopping-basket "></i>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}