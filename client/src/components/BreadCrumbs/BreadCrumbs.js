import React, { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import './BreadCrumbs.scss'
import { ProductsContext } from '../../context/state/ProductsState';

export const BreadCrumbs = ({  category, product = null }) => {
    const { currentPageCategory,categories } = useContext(ProductsContext)

    // const [category, currentPageCategory] = useState({})

    // useEffect(() => {
    //     console.log('aaaaaaaaaaaaaaaaaaaaaaa',currentPageCategory)
    // }, [currentPageCategory])

    if (!currentPageCategory) return null

    let segment = null
    if (product) {
        segment = <>
            <i className="fas fa-chevron-right" ></i>
            <Link to={`/shop/${currentPageCategory.route}/${product.route}`}>{product.name}</Link>
        </>
    }


    return (
        <div className='brad-crumb-wrapper'>
            <div></div>
            <div className="bread-crumb">
                <Link to="/">Main</Link>
                <i className="fas fa-chevron-right"></i>
                <Link to={`/shop/${currentPageCategory.route}`}>{currentPageCategory.name} </Link>
                {segment}
            </div>
            <div></div>
        </div>
    )
}


