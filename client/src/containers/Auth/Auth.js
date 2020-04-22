import React, { useEffect, useState, useCallback, useContext } from 'react'
import { AuthContext } from '../../context/state/AuthState'
import { Modal } from '../../components/Modal/Modal'
import { GlobalContext } from '../../context/state/GlobalState'
import './Auth.scss'

export const AuthForm = () => {
    const { signIn, signUp, authScreen, checkAuth } = useContext(AuthContext)
    const { toggleModal, currentModal, showModal, activateAlertTop } = useContext(GlobalContext)


    const [errors, setErrors] = useState({})
    const [tab, setTab] = useState('signin') // or signup

    useEffect(() => {
    }, [tab, authScreen, errors])

    const handleSignUp = useCallback(event => {
        event.preventDefault();
        const { email, confirmEmail, password, firstName, lastName, cellphone, confirmPassword } = event.target.elements;
        signUp({
            email: email.value,
            confirmEmail: confirmEmail.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            cellphone: cellphone.value,
            confirmPassword: confirmPassword.value
        })
            .then(() => {
                toggleModal('signIn')
                activateAlertTop({
                    title: `Thank you for registaring. Check your Email.`,
                    color: 'green'
                })
            })
            .catch(error => {
                if (error.errors) setErrors(error.errors)
            })
    }, [currentModal, showModal])

    const handleSignIn = useCallback(event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        signIn({ email: email.value, password: password.value })
            .then(result => {
                toggleModal('signIn')
                checkAuth()
                activateAlertTop({
                    title: 'You are signed In',
                    color: 'green'
                })
            })
            .catch(error => {
                console.log(error)
                if (error.errors) setErrors(error.errors)
            })
    }, [authScreen, currentModal])


    const handleTab = tab => {
        setTab(tab)
    }


    const handleInputError = input => {
        return errors[input] ? 'inputError' : ''
    }

    const handleInputErrorMsg = error => {
        return !error ? null : <><br /><span className='errorMsgFormInput'>{error.msg}</span></>
    }

    const tabsBtns = (
        <ul className="tabsBtn">
            <li onClick={() => handleTab('signin')} className={tab === 'signin' ? 'chosen' : ''}>Sign-In</li>
            <li onClick={() => handleTab('signup')} className={tab === 'signup' ? 'chosen' : ''}>Sign-Up</li>
        </ul>
    )



    const signInForm = (
        <form onSubmit={handleSignIn}>
            <label>
                Email
                {handleInputErrorMsg(errors.email)}
                <input type="text" name="email" className={handleInputError('email')} required />
                {/* <input type="text" name="text"  /> */}
            </label>
            <label>
                Password
                {handleInputErrorMsg(errors.password)}
                <input type="text" name="password" className={handleInputError('password')} required />
                {/* <input type="password" name="text" /> */}
            </label>
            <div className='errorMsgForm'>
                {errors.msg ? errors.msg : ''}
            </div>
            <button type="submit">Sign-In</button>
        </form>
    )

    const signupForm = (
        <form onSubmit={handleSignUp}>
            <label>
                First Name
                {handleInputErrorMsg(errors.firstName)}
                <input name="firstName" type="text" className={handleInputError('firstName')} required />
            </label>
            <label>
                Last Name
                {handleInputErrorMsg(errors.lastName)}
                <input name="lastName" type="text" className={handleInputError('lastName')} required />
            </label>
            <label>
                Phone
                {handleInputErrorMsg(errors.cellphone)}
                <input name="cellphone" type="phone" className={handleInputError('cellphone')} required />
            </label>
            <label>
                Email
                {handleInputErrorMsg(errors.email)}
                <input name="email" type="email" className={handleInputError('email')} required />
            </label>
            <label>
                Confirm Email
                {handleInputErrorMsg(errors.confirmEmail)}
                <input name="confirmEmail" type="email" className={handleInputError('confirmEmail')} required />
            </label>
            <label>
                Password
                {handleInputErrorMsg(errors.password)}
                <input name="password" type="password" className={handleInputError('password')} required />
            </label>
            <label>
                Verify Password
                {handleInputErrorMsg(errors.confirmPassword)}
                <input name="confirmPassword" type="password" className={handleInputError('confirmPassword')} required />
            </label>
            <button type="submit">Sign-Up</button>
        </form>
    )

    return (
        <>
            <Modal name={'signIn'}>
                <section className={'auth-form-wrapper showAuth'}>
                    <div className="tabs">
                        {tabsBtns}
                        <div className="tabs-screens">
                            <div className={tab === 'signin' ? 'show-tab sigIn-tab' : 'sigIn-tab'}>
                                {signInForm}
                            </div>
                            <div className={tab === 'signup' ? 'show-tab signup-tab' : 'signup-tab'}>
                                {signupForm}
                            </div>
                        </div>
                    </div>

                </section>
            </Modal>
            {/* <div onClick={toggleAuthScreen} className={authScreen ? 'backdrop showAuth' : 'backdrop'} ></div> */}
        </>
    )
}
