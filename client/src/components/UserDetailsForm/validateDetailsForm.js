// import React from 'react'
import { validator as v, isEmail, isEmpty, isInt, isLength, isAlpha, isNumeric } from 'validator';


export const validateCheckouForm = (fields, formValues, setFormValues, setErrors, activateAlertTop) => {

    console.log('###################', fields)
    const e = []
    let updateErrors = {}
    if (!isEmail(fields.email)) {
        updateErrors = { ...updateErrors, email: { msg: 'Invalid Email' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, email: fields.email })
    }

    if (isEmpty(fields.country)) {
        updateErrors = { ...updateErrors, country: { msg: 'Country required' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, country: fields.country })
    }

    if (isEmpty(fields.city)) {
        updateErrors = { ...updateErrors, city: { msg: 'City details required' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, city: fields.city })
    }

    if (isEmpty(fields.streetAddress)) {
        updateErrors = { ...updateErrors, streetAddress: { msg: 'Address details required' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, streetAddress: fields.streetAddress })
    }

    if (isEmpty(fields.apartment)) {
        updateErrors = { ...updateErrors, apartment: { msg: 'Apartment details required' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, apartment: fields.apartment })
    }

    if (isEmpty(fields.zipcode) || !isNumeric(fields.zipcode) || !isLength(`${fields.zipcode}`, { min: 5, max: 8 })) {
        updateErrors = { ...updateErrors, zipcode: { msg: 'Apartment details required' } }
        e.push(true)
    } else {
        setFormValues({ ...formValues, zipcode: fields.zipcode })
    }


    setErrors({ ...updateErrors })
    if (e.length > 0) {
        activateAlertTop({ title: 'Youre missing some personal details...', color: 'rgb(255, 153, 0)' })
        return false
    }

    return true
}
