import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { QuiclNav } from '../../components/QuiclNav/QuiclNav'
import { ProductsContext } from '../../context/state/ProductsState'
import { GlobalContext } from '../../context/state/GlobalState';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider'
import { ProductCards } from '../../components/ProductCards/ProductCards';
import { CategoriesList } from '../../components/CategoriesList/CategoriesList';
import sliderSettings from './sliderSettings'

import banner2 from '../../assets/images/box-banner.png'
import banner1 from '../../assets/images/box-banner-left.png'
import { Modal } from '../../components/Modal/Modal';
import './Home.scss'
import { AuthContext } from '../../context/state/AuthState';
import { ProductLoaderElement } from '../../components/ProductLoaderElement/ProductLoaderElement';
import { TopBannerHp } from '../../components/TopBannerHp/TopBannerHp';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
const ConfirmHandler = () => {
    let query = useQuery()
    const confirm = query.get("confirm")
    const { toggleModal } = useContext(GlobalContext)
    const [title, settitle] = useState('')
    const [message, setmessage] = useState('')
    const { signOut } = useContext(AuthContext)

    useEffect(() => {
        if (confirm === 'success') {
            signOut()
            settitle('Thank you for registering.')
            setmessage('You have confirmed your account, Please sign-in.')
        } else {
            settitle('Oh oh...')
            setmessage('Somthing went wrong, Please contact us.')
        }
        if (confirm) toggleModal('confirm')

    }, [])
    if (!confirm) return null

    return (
        <Modal name={'confirm'} title={title} content={message} action={toggleModal} />
    )
}

export const Home = () => {
    const { hotProducts, getHotProducts } = useContext(ProductsContext)
    

    useEffect(() => {
        if (hotProducts.length === 0) getHotProducts()
    }, [hotProducts.length])

    if (hotProducts.length === 0) return (
        <ul className="products-cards">
            <ProductLoaderElement items={4} />
        </ul>
    )

    return (
        <>
            <ConfirmHandler />
            <QuiclNav />
            <section className="main-content-home">
                <div className="home-categories-wrapper">

                    <div className="hp-big-slider">
                    </div>

                    <div className="hp-hot-items">
                        <h1>Hot Products</h1>
                        <ProductCards products={[...hotProducts]} />
                        {/* <ProductCards /> */}
                    </div>

                    <TopBannerHp />

                    <div className="hp-categories">
                        <h2>Shop By Department</h2>
                        <CategoriesList />
                    </div>

                    <div className="hp-middle-title">
                        <h3>Special Offers</h3>
                    </div>


                    <Link className="hp-middle-left-banner" to="/">
                        <img src={banner2} alt="" />
                    </Link>

                    <Link className="hp-middle-right-banner" to="/">
                        <img src={banner1} alt="" />
                    </Link>

                    <div className="hp-slider">
                        <ProductsSlider settings={sliderSettings} />
                    </div>
                </div>
            </section>
        </>
    )
}