import React, { useEffect, useContext } from 'react'
import './AlertTop.scss'
import { GlobalContext } from '../../context/state/GlobalState'


export const AlertTop = () => {
    // const [alert, setAlert] = useState(false)
    const { hideAlertTop, alertTop, alertTopTitle, alertTopColor } = useContext(GlobalContext)


    useEffect(() => {
        if(alertTop) setTimeout(() => hideAlertTop(), 6000)

    }, [alertTop,alertTopTitle])

    return (
        <div
            onClick={() => hideAlertTop()}
            style={{ backgroundColor: (alertTopColor ? alertTopColor : '') }}
            className={alertTop ? 'alertTop showAlertTop' : 'alertTop'}>
            {alertTopTitle}
        </div>
    )
}