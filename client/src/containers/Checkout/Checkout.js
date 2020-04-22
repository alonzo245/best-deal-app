import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { CartContext } from '../../context/state/CartState'
import { CartList } from '../../components/CartList/CartList'
import { UserDetailsForm } from '../../components/UserDetailsForm/UserDetailsForm'
import { PaymetForm } from '../../components/PaymetForm/PaymetForm'
import './Checkout.scss'
import { client } from '../../Utils/Client'
import { AuthContext } from '../../context/state/AuthState';
import { GlobalContext } from '../../context/state/GlobalState';
import { validatePaymentForm } from '../../components/PaymetForm/validatePaymentForm'

export const Checkout = () => {
    const { cart } = useContext(CartContext)
    // const [orderStatus, setOrderStatus] = useState(false)
    // if (orderStatus) return <Redirect to="/user/orders" />
    const { activeCustomer, updateLocalStorageCustomer, errorHandler } = useContext(AuthContext)
    const { activateAlertTop, alertTopTitle } = useContext(GlobalContext)
    const { resetCart } = useContext(CartContext)

    const [redirectOnSuccess, setRedirectOnSuccess] = useState(false)
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        nameOnCard: '',
        creditCard: '',
        expMonuth: '',
        expYear: '',
        cvv: '',
    })

    useEffect(() => {
    }, [activeCustomer])

    const handleSubmitPaymentForm = async event => {
        try {
            event.preventDefault();
            event.persist()
            const validateCustomerInfo = Object.keys(activeCustomer).every(field => {
                if (field === 'avatar') return true
                if (field === 'onBoardingDone' && activeCustomer[field] === false) {
                    activateAlertTop({
                        title: 'You need to confirm you email before ordering, check your email.',
                        color: 'red'
                    })
                    console.log('onbording')
                    return false
                }
                if (!activeCustomer[field]) return false

                return true
            })

            // check customer info
            if (!validateCustomerInfo) {
                console.log('validateCustomerInfo', validateCustomerInfo)
                activateAlertTop({
                    title: 'Fill your personal details to proceed with the order.',
                    color: 'red'
                })
                return false
            }

            // check payment info
            if (!validatePaymentForm({ ...formValues }, formValues, setFormValues, setErrors, activateAlertTop)) {
                console.log('validatePaymentForm', validatePaymentForm())
                return false
            }

            // check cart
            let lsCart = JSON.parse(localStorage.getItem('cart'))
            if (!lsCart) {
                console.log('validateCustomerInfo', validateCustomerInfo)
                activateAlertTop({
                    title: 'Your cart is empty.',
                    color: 'gray'
                })
                return false
            }


            const customer = JSON.parse(localStorage.getItem('customer'))
            const response = await client.post('/order/checkout', {
                paymentDetails: { ...formValues },
                cart: [...lsCart]
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + customer.accessToken
                    }
                })

            if (response.data.msg === 'success') {
                resetCart()
                setRedirectOnSuccess(true)
                // event.target.reset()
            }
            activateAlertTop({ title: 'Order is Placed, check your email.', color: 'green' })
        } catch (error) {
            activateAlertTop(errorHandler(error))
        }
    }


    const handleInputValue = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleInputError = input => {
        return errors[input] ? 'inputError' : ''
    }

    const handleInputErrorMsg = error => {
        return !error ? null : <> <br /><span className='errorMsgFormInput'>{error.msg}</span></>
    }


    if(redirectOnSuccess)  return <Redirect to="/user/orders" />

    return (
        <section className="content-checkout-wrapper">
            <h1><i className="fas fa-money-check"></i> Checkout</h1>
            <div className="checkout-main">

                <div className="segment">
                    <div className="checkout-user-details">
                        <h2>1. Billing Address</h2>
                        <UserDetailsForm />
                    </div>
                </div>

                <div className="segment">
                    <div className="checkout-payment">
                        <h2>2. Paymnet</h2>
                        <PaymetForm
                            errors={errors}
                            handleInputValue={handleInputValue}
                            handleInputError={handleInputError}
                            handleInputErrorMsg={handleInputErrorMsg}
                            handleSubmitPaymentForm={handleSubmitPaymentForm}
                        />
                    </div>
                </div>


                <div className="segment">
                    <div className="checkout-total">
                        <h2>3. Checkout Info</h2>
                        <div className="checkout-sum-main">
                            <span>Total Amount: {
                                cart.reduce((result, product) => {
                                    return result + product.price * product.quantity
                                }, 0)
                            }$</span>
                        </div>
                        <button onClick={handleSubmitPaymentForm}>Confirm Order</button>

                        <h3>Order's Items</h3>
                        <CartList settings={{ description: false }} />
                    </div>
                </div>

            </div>
        </section>
    )
}