import React, { useEffect, useCallback, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { extractFromData } from '../../Utils/Utils'
import { authClient } from '../../Utils/Client'
import { GlobalContext } from '../../context/state/GlobalState'

export const UserPasswordForm = () => {
    const { activeCustomer, errorHandler } = useContext(AuthContext)
    const { activateAlertTop } = useContext(GlobalContext)
    const [errors, setErrors] = useState({})


    useEffect(() => {
    }, [activeCustomer])

    const handleUpdatePassword = useCallback(async event => {
        event.preventDefault();
        event.persist()
        const formData = { ...event.target.elements }

        try {
            const customer = JSON.parse(localStorage.getItem('customer'))
            const res = await authClient.post('/update-password',
                { ...extractFromData(formData) },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + customer.accessToken
                    }
                })

            let response = await res.data
            event.target.reset()

            if (response.status === 'success') {
                activateAlertTop({ title: 'Password updated', color: 'green' })
            }
        } catch (error) {
            activateAlertTop(errorHandler(error))
            // setErrors(error?.response?.data?.errors)
        }
    }, [])

    const handleInputError = input => {
        return errors[input] ? 'inputError' : ''
    }

    const handleInputErrorMsg = error => {
        return !error ? null : <><br /><span className='errorMsgFormInput'>{error.msg}</span></>
    }


    if (!activeCustomer) return <Redirect to="/" />

    return (
        <>
            <h2>Update Password</h2>
            <form onSubmit={handleUpdatePassword}>
                <label>
                    Youre password
                    {handleInputErrorMsg(errors?.oldPassword)}
                    <input name="oldPassword" type="password" placeholder='' className={handleInputError('oldPassword')} />
                </label>
                <label>
                    New password
                    {handleInputErrorMsg(errors?.newPassword)}
                    <input name="newPassword" type="password" placeholder='' className={handleInputError('newPassword')} />
                </label>
                <label>
                    Confirm new password
                    {handleInputErrorMsg(errors?.confirmNewPassword)}
                    <input name="confirmNewPassword" type="password" placeholder='' className={handleInputError('confirmNewPassword')} />
                </label>
                <button type="submit">Update Password</button>
            </form>
        </>
    )
}
