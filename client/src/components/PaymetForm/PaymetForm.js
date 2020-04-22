import React, { useCallback, useContext, useEffect, useState } from 'react'
import { validatePaymentForm } from './validatePaymentForm'
import { AuthContext } from '../../context/state/AuthState'
import { GlobalContext } from '../../context/state/GlobalState'

import './PaymetForm.scss'

export const PaymetForm = ({ errors, handleSubmitPaymentForm, handleInputValue, handleInputError, handleInputErrorMsg }) => {



    return (
        <div className="payment-form">
            <form onSubmit={handleSubmitPaymentForm}>
                <label className="">
                    Name on card {handleInputErrorMsg(errors.firstName)}
                    <input name="nameOnCard" placeholder="" type="text" onChange={handleInputValue}
                        className={handleInputError('nameOnCard')} />
                </label>
                <label className="">
                    Credit card number {handleInputErrorMsg(errors.creditCard)}
                    <input name="creditCard" placeholder="" type="text" onChange={handleInputValue}
                        className={handleInputError('creditCard')} />
                </label>
                <div>
                    <label className="expMonuth">
                        Exp Month {handleInputErrorMsg(errors.expMonuth)}
                        <input name="expMonuth" placeholder="" type="text" onChange={handleInputValue}
                            className={handleInputError('expMonuth')} />
                    </label>
                    <label className="expYear">
                        Exp Year {handleInputErrorMsg(errors.expYear)}
                        <input name="expYear" placeholder="" type="text" onChange={handleInputValue}
                            className={handleInputError('expYear')} />
                    </label>
                </div>
                <label className="cvv">
                    CVV {handleInputErrorMsg(errors.cvv)}
                    <input name="cvv" placeholder="" type="text" onChange={handleInputValue}
                        className={handleInputError('cvv')} />
                </label>
                {/* <button type="submit">Update Card</button> */}
            </form>
        </div>
    )
}
