import React, { useEffect, useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { client } from '../../Utils/Client'
import { GlobalContext } from '../../context/state/GlobalState'
import './UserOrders.scss'
import { CartContext } from '../../context/state/CartState'

export const UserOrders = () => {
    const { activeCustomer, errorHandler } = useContext(AuthContext)
    const { activateAlertTop } = useContext(GlobalContext)
  

    const [currentTab, setCurrentTab] = useState(null)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        if (orders === null) fetchOrders()
    }, [currentTab, orders])


    const fetchOrders = async () => {
        const lsCustomer = JSON.parse(localStorage.getItem('customer'))
        try {
            const response = await client.get('/order', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + lsCustomer.accessToken
                }
            });
            console.log(response.data)
            setOrders(response.data)

        } catch (error) {
            // activateAlertTop(errorHandler(error))
        }
    }

    const handleTab = tab => {
        if (tab === currentTab) {
            return setCurrentTab(null)
        }
        setCurrentTab(tab)
    }

    if (!activeCustomer) return <Redirect to="/" />

    if (!orders) return null

    return (
        <section className="user-orders-wrapper">
            <h1>My Orders</h1>
            {
                orders.length === 0 ?
                    <div className="no-order">You still do not have any orders...</div>
                    :
                    orders.map((order, i) => {
                        return (
                            <ul className={currentTab === i ? "order show" : "order"} key={i}>
                                <li>
                                    <button onClick={() => handleTab(i)}>
                                        <i className={currentTab === i ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i>
                                        <span>
                                            Order ID <span>{order.orderId}</span>
                                        </span>
                                    </button>
                                </li>
                                <li className="">Shipping Details</li>
                                <li className="">Purchase Date: <span>{order.updatedAt}</span></li>
                                <li>Email: <span>{order.shipping.email}</span></li>
                                <li>First Name: <span> {order.shipping.firstName}</span></li>
                                <li>Last Name: <span> {order.shipping.lastName}</span></li>
                                <li>Cell phone: <span> {order.shipping.cellphone}</span></li>
                                <li>Country: <span> {order.shipping.country}</span></li>
                                <li>City: <span> {order.shipping.city}</span></li>
                                <li>Street: <span> {order.shipping.streetAddress}</span></li>
                                <li>Apartment: <span> {order.shipping.apartment}</span></li>
                                <li>Zipcode: <span> {order.shipping.zipcode}</span></li>

                                <ul className="order-list">
                                    {order.products.map((product, x) => {
                                        return (
                                            <li key={x}>
                                                <Link to="/">
                                                    <img className="" src={product.image} alt={product.name} />
                                                </Link>
                                                <div className="order-item-attr">
                                                    <h5>{product.name}</h5>
                                        quantity: {product.quantity}
                                                    <br />
                                        price per unit: {product.price}$
                                        </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </ul>
                        )
                    })}
        </section>
    )
}
