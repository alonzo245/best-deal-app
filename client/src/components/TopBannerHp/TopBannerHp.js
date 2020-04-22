
import React, { useState } from 'react'
import './TopBannerHp.scss'
import { Link } from 'react-router-dom'
import top from '../../assets/images/hp-top-banner.jpg'

export const TopBannerHp = ({ }) => {
    const [load, setLoad] = useState(false)

    const handleLoad = () => {
        console.log('ssss')
        setLoad(true)
    }

    return (
        <>
            {!load ? <div className="top-banner-hp-loader hp-top-banner"></div> : null}

            <Link className="hp-top-banner" to="/">
                <img src={top} alt="" onLoad={handleLoad} />
            </Link>

        </>
    )
}