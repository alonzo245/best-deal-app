import React, { useContext } from 'react'
import { ThemeContext } from '../../context/state/ThemeState'
import './ThemeButton.scss'

export const ThemeButton = ({btnClassName = 'theme-button'}) => {
    const { toggle } = useContext(ThemeContext)

    return (
        <i onClick={toggle} className={`${btnClassName} fa fa-x2 fa-adjust`}></i> 
    )
}