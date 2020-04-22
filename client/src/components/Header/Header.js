import React, { useEffect, useContext, useState } from 'react'
import { Nav } from '../Nav/Nav'
import { GlobalContext } from '../../context/state/GlobalState'
import { AuthContext } from '../../context/state/AuthState'
import './Header.scss'

export const Header = () => {
    const { activateAlertTop } = useContext(GlobalContext)
    const { activeCustomer } = useContext(AuthContext)
    const [showOnce, setShowOnce] = useState(false)


    useEffect(() => {
        if (activeCustomer && activeCustomer.onBoardingDone === false && !showOnce) {
            activateAlertTop({
                title: `We've sent you an Email confirmation.`,
                color: 'red'
            })
            setShowOnce(true)
        }

    }, [activeCustomer])

    return (
        <header className="header">
            <Nav />
        </header>
    )
}