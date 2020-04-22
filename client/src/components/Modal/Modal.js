import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/state/GlobalState'
import './Modal.scss'


export const Modal = ({ children, name, title, content, action, actionText }) => {
    const { toggleModal, showModal, currentModal } = useContext(GlobalContext)

    useEffect(() => {
        setTimeout(() => {
        }, 3000)
    }, [showModal,currentModal])


    if (name !== currentModal || !currentModal) return null
    return (
        <>
            <section className={showModal ? 'modal-wrapper showModal ' : 'modal-wrapper'}>
                {
                    title && <h4>{title}</h4>
                }
                {
                    content && <p>{content}</p>
                }
                {
                    action && <button className="modalBtn" onClick={action}>
                        {actionText ? actionText : 'Dismiss'}
                    </button>
                }
                {
                    children && children
                }
            </section>
            <div onClick={()=>toggleModal(name)}
                className={showModal ? 'backdropModal showModal' : 'backdropModal'} ></div>

        </>
    )
}