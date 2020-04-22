import React, { useReducer, createContext } from "react";
import AuthReducer from '../reducers/AuthReducer'
import { freezPageScroll } from '../../Utils/Utils'
import { authClient, authHeaders, client } from '../../Utils/Client'

//Initiallization
const initialState = {
  activeCustomer: null,
  authScreen: false,
  error: false
}

//Create context
export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)


  /**
   *  error Handler
   */
  function errorHandler(error = null) {
    // console.error(error.response.statusText)
    // console.error(error.response.data.error)
    console.log(error)
    if (!error) return null
    switch (error.response.status) {
      case 400:
        // bad parameters
        return {
          title: `Somthing went wrong with, Try again...`,
          color: 'red'
        }
      case 401:
      case 500:
        // jwt expired
        dispatch({
          type: 'AUTH_ERROR',
          payload: error
        })
        
        signOut()
        return {
          title: `Please Try again...`,
          color: 'red'
        }
      
      default:
        return {
          title: `Its not suposed to happened`,
          color: 'orang'
        }
    }



    
  }

  /**
   *  update customer
   */

  function updateCustomer(activeCustomer) {
    dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: { ...activeCustomer }
    })
  }

  /**
   * SIgnIn
   */
  async function signIn({ email, password }) {
    try {
      const response = await authClient.post('/sign-in', {
        email,
        password
      })

      if (!response.data) {
        dispatch({
          type: 'AUTH_FAIL'
        })
        return response.data
      }

      const sessionExp = new Date(new Date().getTime() + 5000)
      localStorage.setItem('sessionExp', `${sessionExp}`)
      localStorage.setItem('customer', JSON.stringify(response.data))

      dispatch({
        type: 'SIGN_IN',
        payload: { ...response.data }

      })
      Promise.resolve({ status: 'success' })
    } catch (error) {
      errorHandler(error)
      throw Error(error)
    }
  }

  /**
   * SignUp
   */
  async function signUp(customerData) {
    try {
      const response = await authClient.post('/sign-up', customerData)

      //check if success
      if (response.data.accessToken) {
        const sessionExp = new Date(new Date().getTime() + 8000)
        localStorage.setItem('sessionExp', `${sessionExp}`)
        localStorage.setItem('customer', JSON.stringify(response))

        dispatch({
          type: 'SIGN_IN',
          payload: { ...response }

        })
        return true
      }
    } catch (error) {
      errorHandler(error)
      throw Error(error)
    }
  }

  /**
   * SignOut
   */
  async function signOut() {
    const customer = JSON.parse(localStorage.getItem('customer'))
    const expirationDate = new Date(localStorage.getItem('sessionExp'))
    if (!customer || !expirationDate) return false

    localStorage.removeItem('customer')
    localStorage.removeItem('sessionExp')

    try {
      await client.post('/sign-out', {
        token: customer.customerId
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + customer.accessToken
        }
      })
    } catch (error) {
      console.error(error)
      toggleAuthScreen()
    }

    dispatch({ type: 'SIGN_OUT', payload: null })
  }

  /**
   * 
   */
  function toggleAuthScreen() {
    freezPageScroll()
    dispatch({
      type: 'AUTH_SCREEN',
      payload: null
    })
  }

  /**
   * 
   */
  async function checkAuth() {
    try {
      // return
      // check if customer exist
      const activeCustomer = JSON.parse(localStorage.getItem('customer')) || null
      const expirationDate = new Date(localStorage.getItem('sessionExp'))

      // signOut if not
      if (!activeCustomer) return signOut()

      // check if session time is over
      if (expirationDate <= new Date()) {
        // try to refresh token
        const token = await refreshToken()
        if (!token) return signOut()
      }

      // check is success update state!
      dispatch({ type: 'AUTH_SUCCESS', payload: activeCustomer })

      // interval customer session
      // set new expiration date
      const newExpirationDate = new Date(new Date().getTime() + 1000 * 1 * 60 * 60) //refresh every hour
      // const newExpirationDate = new Date(new Date().getTime() + 12000) //every 5 sec
      localStorage.setItem('sessionExp', `${newExpirationDate}`)
      setTimeout(async () => await checkAuth(), newExpirationDate.getTime() - new Date().getTime())

    } catch (err) {
      console.error(err)
    }
  }


  /**
  * refresh token
  */
  async function refreshToken() {
    const lsCustomer = JSON.parse(localStorage.getItem('customer'))
    const expirationDate = new Date(localStorage.getItem('sessionExp'))

    if (!lsCustomer || !expirationDate) return false

    try {
      const response = await authClient.post('/token', {
        token: lsCustomer.refreshToken
      },
      authHeaders(lsCustomer))

      if (!response.data) return false

      // set new token
      localStorage.setItem('customer', JSON.stringify({
        ...lsCustomer,
        accessToken: response.data.accessToken
      }))

      return true

    } catch (err) {
      console.error(err)
      if (err.response) {
        toggleAuthScreen()
      }

    }
  }


  /**
   * 
   */
  function updateLocalStorageCustomer(customer) {
    const lsCustomer = JSON.parse(localStorage.getItem('customer')) || null
    const activeCustomer = { ...lsCustomer, ...customer }
    localStorage.setItem('customer', JSON.stringify(activeCustomer))
    dispatch({ type: 'AUTH_SUCCESS', payload: activeCustomer })
  }


  return (<AuthContext.Provider value={{
    activeCustomer: state.activeCustomer,
    authScreen: state.authScreen,
    signUp,
    signIn,
    signOut,
    toggleAuthScreen,
    checkAuth,
    updateLocalStorageCustomer,
    updateCustomer,
    errorHandler
  }}> {children}
  </AuthContext.Provider>)
}