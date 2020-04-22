import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/state/AuthState'
import { SideMenu } from '../..//components/SideMenu/SideMenu'
import './UserSettings.scss'


export const UserSettings = () => {
    const { activeCustomer } = useContext(AuthContext)

    useEffect(() => {

    }, [])

    const handleUpdateDetails = useCallback(event => {
        event.preventDefault();
        const { email, password, addresas } = event.target.elements;
    }, [])

    if (!activeCustomer) return <Redirect to="/" />

    return (
        <section className="user-settings-wrapper">
            <SideMenu />
            <div className="user-settings-main">
                <h1>User Details</h1>
                <div className="user-settings-grid">
                    <div className="user-settings-left"></div>

                        <div className="user-settings-middle">
                            <form onSubmit={handleUpdateDetails}>
                                <input type="text" placeholder="First Name" />
                                <input type="text" placeholder="Last Name" />
                                <input type="text" placeholder="Email" />
                                <input type="text" placeholder="Password" />
                                <input type="text" placeholder="Verify Password" />
                                <button type="submit">Update Details</button>
                            </form>
                        </div>
                    

                    <div className="user-settings-right">r</div>
                </div>
            </div>
        </section>
    )
}
