import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { client } from '../../Utils/Client'
import { GlobalContext } from '../../context/state/GlobalState'
import {validateCheckouForm} from './validateDetailsForm'
import './UserDetailsForm.scss'

export const UserDetailsForm = ({ }) => {
    const { activeCustomer, updateLocalStorageCustomer, errorHandler } = useContext(AuthContext)
    const { activateAlertTop } = useContext(GlobalContext)

    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        firstName: activeCustomer?.firstName || '',
        lastName: activeCustomer?.lastName || '',
        email: activeCustomer?.email || '',
        cellphone: activeCustomer?.cellphone || '',
        country: activeCustomer?.country || '',
        city: activeCustomer?.city || '',
        streetAddress: activeCustomer?.streetAddress || '',
        apartment: activeCustomer?.apartment || '',
        zipcode: activeCustomer?.zipcode || ''
    })

    const handleUpdateDetails = async event => {
        try {
            event.preventDefault();
            event.persist()
            if (!validateCheckouForm({ ...formValues }, formValues, setFormValues, setErrors, activateAlertTop)) return false
            // return false

            const customer = JSON.parse(localStorage.getItem('customer'))
            const res = await client.post('/customer/update-info',
                { ...formValues },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + customer.accessToken
                    }
                })

            let response = await res.data
            event.target.reset()

            if (response.status === 'success') {
                updateLocalStorageCustomer(response.customer)
            }
            activateAlertTop({ title: 'Details saved', color: 'green' })
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
        return !error ? null : <> - <span className='errorMsgFormInput'>{error.msg}</span></>
    }


    if (!activeCustomer) return <Redirect to="/" />

    return (
        <div className="user-details-form">
            <form onSubmit={handleUpdateDetails}>

                <label>First Name {handleInputErrorMsg(errors.firstName)}
                    <input type="text" name="firstName" value={activeCustomer.firstName}
                        onChange={handleInputValue} className={handleInputError('firstName')} disabled />
                </label>

                <label>Last Name {handleInputErrorMsg(errors.lastName)}
                    <input type="text" name="lastName" value={activeCustomer.lastName}
                        onChange={handleInputValue} className={handleInputError('lastName')} disabled />
                </label>

                <label>Email {handleInputErrorMsg(errors.email)}
                    <input type="email" name="email" value={activeCustomer.email}
                        onChange={handleInputValue} className={handleInputError('email')} disabled />
                </label>

                <label>Phone {handleInputErrorMsg(errors.cellphone)}
                    <input type="phone" name="cellphone" value={activeCustomer.cellphone}
                        onChange={handleInputValue} className={handleInputError('cellphone')} disabled />
                </label>

                <label>Country {handleInputErrorMsg(errors.country)}
                    <input type="text" name="country" value={formValues.country}
                        onChange={handleInputValue} className={handleInputError('country')} />
                </label>

                <label>City {handleInputErrorMsg(errors.city)}
                    <input type="text" name="city" value={formValues.city}
                        onChange={handleInputValue} className={handleInputError('city')} />
                </label>

                <label>streetAddress {handleInputErrorMsg(errors.streetAddress)}
                    <input type="text" name="streetAddress" value={formValues.streetAddress}
                        onChange={handleInputValue} className={handleInputError('streetAddress')} />
                </label>

                <label>Apartment No. {handleInputErrorMsg(errors.apartment)}
                    <input type="text" name="apartment" value={formValues.apartment}
                        onChange={handleInputValue} className={handleInputError('apartment')} />
                </label>

                <label>Zipcode {handleInputErrorMsg(errors.zipcode)}
                    <input type="text" name="zipcode" value={formValues.zipcode}
                        onChange={handleInputValue} className={handleInputError('zipcode')} />
                </label>

                <button type="submit">Update Details</button>
            </form>
        </div>
    )
}
