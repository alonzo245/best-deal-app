import { validator as v, isEmail, isEmpty, isInt,isLength } from 'validator';


export const injects = (activeCustomer, setCustomerInfoValidate, activateAlertTop) => ({
    validateCheckouForm: () => {
        if(!activeCustomer) return false
        // check if customer info correct
        let c = { ...activeCustomer }
        const personalInfoErrors = []
    
        if (!isEmail(c.email)) {
            personalInfoErrors.push({ field: 'email', msg: 'Email is not valid' })
        }
    
        if (isEmpty(c.country) || isLength(c.country, {min: 1})) {
            personalInfoErrors.push({ field: 'country', msg: 'country' })
        }
    
        if (isEmpty(c.city) || isLength(c.city, {min: 1})) {
            personalInfoErrors.push({ field: 'city', msg: 'city' })
        }
    
        if (isEmpty(c.streetAddress) || isLength(c.streetAddress, {min: 1})) {
            personalInfoErrors.push({ field: 'streetAddress', msg: 'streetAddress' })
        }
    
        if (isEmpty(c.apartment) || isLength(c.apartment, {min: 1})) {
            personalInfoErrors.push({ field: 'apartment', msg: 'apartment' })
        }
    
        if (isEmpty(c.zipcode) || isInt(c.zipcode) || isLength(c.zipcode, {min: 5, max: 8})) {
            personalInfoErrors.push({ field: 'zipcode', msg: 'zipcode' })
        }
    
    
        console.log('personalInfoErrors', personalInfoErrors)
        if (personalInfoErrors.length > 0) {
            setCustomerInfoValidate(personalInfoErrors)
            activateAlertTop({ title: 'Youre missing some personal details...', color: 'rgb(255, 153, 0)' })
            return false
        }
    
        // check payment details
        // if (customerPaymentInfoValid.length > 0) {
        //     activateAlertTop({ title: 'Check youre payment details...', color: 'rgb(255, 153, 0)' })
        //     return false
        // }
    
        return true
    }
})