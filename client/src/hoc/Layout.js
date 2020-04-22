import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer';
import { Home } from '../containers/Home/Home'
import { Contact } from '../containers/Contact/Contact';
import { Products } from '../containers/Products/Products';
import { Product } from '../containers/Product/Product';
import { Cart } from '../containers/Cart/Cart';
import { Checkout } from '../containers/Checkout/Checkout';
import { NotFound } from '../containers/NotFound/NotFound'
import { MobileNav } from '../components/MobileNav/MobileNav'
import { AuthForm } from '../containers/Auth/Auth';
import { ProductsContext } from '../context/state/ProductsState'
import { AuthContext } from "../context/state/AuthState"
import { UserSettings } from '../containers/UserSettings/UserSettings';
import CircleLoader from "react-spinners/FadeLoader";
import { CartContext } from '../context/state/CartState';
import { ConfirmAccount } from '../Utils/ConfirmAccount';
import { AlertTop } from '../components/AlertTop/AlertTop';

export const Layout = () => {
    const { checkAuth, activeCustomer } = useContext(AuthContext)
    const { getCart } = useContext(CartContext)
    const { getCategories, categories } = useContext(ProductsContext)

    useEffect(() => {
        if (categories.length === 0) getCategories()

        if (!activeCustomer) {
            checkAuth()
        } else {       
            getCart(activeCustomer)
        }
    }, [activeCustomer])

    // if (categories.length === 0) return <div className="loader"><CircleLoader size={100} color={'white'} /></div>

    return (
        <Router>
            <AlertTop />
            <AuthForm />
            <Header />
            <MobileNav />
            <div className="grid-container">
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route exact path={"/confirm-account/:confirmToken"} component={ConfirmAccount} />
                    <Route exact path={"/checkout"} component={Checkout} />
                    <Route exact path={"/contact-us"} component={Contact} />
                    <Route exact path={"/cart"} component={Cart} />
                    <Route exact path={"/shop/:routeCategory"} component={Products} />
                    <Route exact path={"/shop/:routeCategory/:routeProductName"} component={Product} />
                    <Route exact path={"/user/:topic"} component={UserSettings} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </div>
            <Footer />
        </Router>
    )
}