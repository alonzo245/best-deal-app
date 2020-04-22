// import React from 'react'
import { validator as v, isEmail, isEmpty, isInt, isLength, isAlpha, isNumeric } from 'validator';


export const validatePaymentForm = (fields, formValues, setFormValues, setErrors, activateAlertTop) => {

    console.log('###################', fields)
    const e = []
    let updateErrors = {}


    if (isEmpty(fields.nameOnCard) || !isAlpha(fields.nameOnCard)) {
        updateErrors = { ...updateErrors, nameOnCard: { msg: '' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, nameOnCard: fields.nameOnCard })
    }


    if (isEmpty(fields.creditCard) 
    || !isNumeric(fields.creditCard) 
    || !isLength(`${fields.creditCard}`, { min: 12, max: 12 })) {
        updateErrors = { ...updateErrors, creditCard: { msg: '' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, creditCard: fields.creditCard })
    }

    if (isEmpty(fields.expMonuth) 
    || !isNumeric(fields.expMonuth) 
    || !isLength(`${fields.expMonuth}`, { min: 2, max: 2 })) {
        updateErrors = { ...updateErrors, expMonuth: { msg: '' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, expMonuth: fields.expMonuth })
    }

    if (isEmpty(fields.expYear) 
    || !isNumeric(fields.expYear) 
    || !isLength(`${fields.expYear}`, { min: 2, max: 2 })) {
        updateErrors = { ...updateErrors, expYear: { msg: '' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, expYear: fields.expYear })
    }

    if (isEmpty(fields.cvv) 
    || !isNumeric(fields.cvv) 
    || !isLength(`${fields.cvv}`, { min: 3, max: 3 })) {
        updateErrors = { ...updateErrors, cvv: { msg: '' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, cvv: fields.cvv })
    }


    setErrors({ ...updateErrors })
    if (e.length > 0) {
        activateAlertTop({ title: 'Youre missing payment details...', color: 'red' })
        return false
    }

    return true
}
