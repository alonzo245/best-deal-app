
import React, { useEffect, useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { authClient } from './Client'
import { useState } from 'react';
import { AuthContext } from '../context/state/AuthState';

export const ConfirmAccount = () => {
    const { errorHandler , activateAlertTo} = useContext(AuthContext)

    const { confirmToken } = useParams()
    const [data, setdata] = useState(null)

    useEffect(() => {
        validateConfirmToken()
    }, [])

    const validateConfirmToken = async () => {
        try {
            if (!confirmToken) return null
            const response = await authClient.get(`/confirm-account/${confirmToken}`)
            const data = await response.data
            setdata(data.status)
        } catch (error) {
            activateAlertTo(errorHandler(error))
        }
    }

    if (data === null) return null
    if (data === 'success') {
        return <Redirect to='/?confirm=success' />
    } else {
        return <Redirect to='/?confirm=fail' />
    }
}