import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../../context/state/ProductsState'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import { ProductCards } from '../../components/ProductCards/ProductCards'
import { ProductsFilters } from '../../components/ProductsFilters/ProductsFilters'
import { QuiclNav } from '../../components/QuiclNav/QuiclNav'
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs'
import './Products.scss'


export const Products = () => {
    const { getProducts, loading, setPageCategory, currentPageCategory, page, 
        setPage, hasModeToLoad, categoryPageProducts , categories} = useContext(ProductsContext)

    const { routeCategory } = useParams();

    useEffect(() => {
        console.log('$$$$$$$$$$$$$', routeCategory, loading, page)
        setPageCategory(routeCategory)
        if (page === 1 && !loading) getProducts(routeCategory)


        if (hasModeToLoad) window.addEventListener('scroll', paginate)

        return () => window.removeEventListener('scroll', paginate)
    }, [hasModeToLoad, page, currentPageCategory, categories])

    const paginate = () => {
        if (!hasModeToLoad) return

        if (Math.ceil(window.scrollY + window.innerHeight) >= (Math.ceil(document.documentElement.scrollHeight))-1) {
                setPage(page + 1)
                getProducts(routeCategory)
        }
    }

    if (!currentPageCategory) return null

    return (
        <>
            <QuiclNav />
            <div className="shop-wrapper">
                <SideMenu />
                <section className="main-content">
                    <BreadCrumbs category={currentPageCategory} />
                    <div className="products-heading">
                        <h1 className="products-heading-title">{currentPageCategory.name}</h1>
                        <ProductsFilters page={page} />
                    </div>
                    <ProductCards products={categoryPageProducts} />
                </section>

            </div>
        </>
    )
}