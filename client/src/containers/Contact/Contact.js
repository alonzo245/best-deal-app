import React, { useCallback } from 'react'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import { extractFromData } from '../../Utils/Utils'
import axios from 'axios'
import './Contact.scss'

export const Contact = () => {

    const handleSubmitForm = useCallback(async event => {
        event.preventDefault();
        try {
            const res = await axios.post('/success.json',
                extractFromData(event.target.elements))
                
            let response = await res.data
        } catch (error) { 
            console.error(error)
        }
    }, [])

    return (
        <section className="contact-us-wrapper">
            <SideMenu />
            <div className="contact-us-main">
                <h1>Contact Us</h1>
                <div className="contact-us-grid">
                    <div className="contact-us-left">

                        <div className="contact-us-form-wrapper">
                            <form onSubmit={handleSubmitForm}>
                                <label>
                                    Name
                                    <input name="name" type="text" placeholder='' />
                                </label>
                                <label>
                                    Email Address
                                    <input name="email" type="text" placeholder='' />
                                </label>
                                <label>
                                    Details
                                    <textarea name="details"></textarea>
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    )
}
