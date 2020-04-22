import React, { useEffect, useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { UserInfo } from './UserInfo'
import { UserOrders } from './UserOrders'
import './UserSettings.scss'

export const UserSettings = () => {
    const { activeCustomer } = useContext(AuthContext)
    const { topic } = useParams()

    useEffect(() => {

    }, [topic])

    const handlePage = () => {
        switch (topic) {
            case 'settings':
                return < UserInfo />
            case 'orders':
                return <UserOrders />
            default:
                return false
        }
    }

    if (!activeCustomer) return <Redirect to="/" />

    return (
        <section className="user-settings-wrapper">
            {/* <SideMenu /> */}
            <div className="user-settings-main">
                {handlePage()}
            </div>
        </section>
    )
}
