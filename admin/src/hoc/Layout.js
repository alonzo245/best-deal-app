import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../context/state/AuthState"
import { Header } from '../components/Header/Header';
import { Categories } from '../containers/Categories/Categories';
import { Products } from '../containers/Products/Products';
import { Users } from '../containers/Users/Users';
import { Main } from '../containers/Main/Main';

export const Layout = () => {
    const { checkAuth, activeCustomer } = useContext(AuthContext)

    useEffect(() => {
        if (!activeCustomer) checkAuth()
    }, [activeCustomer])


    return (
        <Router>
            <Header />
                <Switch>
                    <Route exact path={"/"} component={Main} />
                    <Route exact path={"/categories"} component={Categories} />
                    <Route exact path={"/products"} component={Products} />
                    <Route exact path={"/users"} component={Users} />                    
                </Switch>
        </Router>
    )
}