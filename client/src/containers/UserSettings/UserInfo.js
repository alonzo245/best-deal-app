import React, { useEffect,  useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { UserDetailsForm } from '../../components/UserDetailsForm/UserDetailsForm'
import { UserPasswordForm } from '../../components/UserPasswordForm/UserPasswordForm'
import { UserAvatarForm } from '../../components/UserAvatarForm/UserAvatarForm'
import './UserSettings.scss'

export const UserInfo = () => {
    const { activeCustomer } = useContext(AuthContext)
    useEffect(() => {
    }, [])

    if (!activeCustomer) return <Redirect to="/" />

    return (
        <>
            <h1>My Info</h1>
            <div className="user-settings-middle">
                <div className="user-settings-form-wrapper">
                    <div><UserDetailsForm /></div>
                </div>

                <div className="user-settings-form-wrapper">
                    <div><UserPasswordForm /></div>
                    <div><UserAvatarForm /></div>
                </div>
            </div>

        </>
    )
}

