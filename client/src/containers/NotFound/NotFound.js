import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.scss'

export const NotFound = () => {
    return (
        <div className="not-found">
            404
            <br />
            <Link to="/" >
                Back To Shopping
            </Link>

        </div>
    )
}
