import React, { useEffect, useState } from 'react'
import { client } from '../../Utils/Client'
import './Products.scss'
import { extractFromData } from '../../Utils/Utils'

const initProduct = {
    oldPrice: '',
    special: '',
    rating: '',
    route: '',
    image: '',
    name: '',
    productId: '',
    categoryId: '',
    price: '',
    description: ''
}

export const Products = () => {
    const [method, setMethod] = useState('POST')

    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(initProduct)

    useEffect(() => {
        fetchData()
    }, [method])

    const fetchData = async () => {
        try {
            const response = await client.get('/product')
            console.log(response.data.products)
            setProducts(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })

    }

    const handleRemoveProduct = async (e, productId) => {
        try {
            e.stopPropagation()
            await client.delete(`/product/${productId}`)
            setProducts([...products.filter(product => product.productId !== productId)])
        } catch (error) {
            console.log(error)
        }
    }



    const handleAdd = async e => {
        setProduct(initProduct)
        setMethod('POST')
        console.log(method)
    }

    const handleEdit = id => {
        const filterProducts = [...products]
        // console.log(id, filterProducts.filter(cat => +cat.productId === +id)[0])
        setProduct(filterProducts.filter(cat => +cat.productId === +id)[0])
        setMethod('PATCH')
        console.log(method)
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const formData = extractFromData({ ...e.target.elements })
            console.log(formData)

            console.log('$$$$$$$$$$$$$$$$$$$$$$$', method)
            let response
            if (method === 'POST') response = await client.post('/product', formData)
            if (method === 'PATCH') response = await client.patch('/product', formData)
            console.log(response.data)

            if (method === 'POST') setProducts([...products, { ...formData, productId: response.data.productId }])
            if (method === 'PATCH') {
                const updatedList = products.map(product => {
                    if (product.productId === formData.productId) {
                        return { ...formData }
                    }
                    return product
                })
                setProducts(updatedList)
            }

            setProduct(initProduct)
        } catch (error) {
            console.log(error)
        }

    }

    if (!products) return 'Loading...'

    return (
        <section className="products-wrapper">

            <div className="products-list">
                <ul className="list">
                    <li className="addProduct" onClick={handleAdd}>Add Product</li>
                    {products.map((product, i) => {
                        return (
                            <li key={i} onClick={() => handleEdit(product.productId)}>
                                {product.name}
                                <div className="removeItem" onClick={e => handleRemoveProduct(e, product.productId)}>Remove</div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="products-form">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="route" className="label">
                        Product ID:
                        <input className="input" type="text" name="productId"
                            value={product.productId} onChange={handleChange} disabled />
                        <input className="input" type="hidden" name="productId"
                            value={product.productId} onChange={handleChange} />
                    </label>

                    <label htmlFor="price" className="label">
                    price:
                        <input className="input" type="text" name="price"
                            value={product.price} onChange={handleChange} />
                    </label>

                    <label htmlFor="oldPrice" className="label">
                    oldPrice:
                    <input className="input" type="text" name="oldPrice"
                            value={product.oldPrice} onChange={handleChange} />
                    </label>

                    <label htmlFor="special" className="label">
                    special
                    <input className="input" type="text" name="special"
                            value={product.special} onChange={handleChange} />
                    </label>

                    <label htmlFor="rating" className="label">
                    rating:
                        <input className="input" type="text" name="rating"
                            value={product.rating} onChange={handleChange} />
                    </label>

                    <label htmlFor="categoryId" className="label">
                    categoryId:
                        <input className="input" type="text" name="categoryId"
                            value={product.categoryId} onChange={handleChange} />
                    </label>

                    <label htmlFor="description" className="label">
                    description:
                        <textarea rows='4' className="input" type="text" name="description"
                            value={product.description} onChange={handleChange} />
                    </label>

                    <button className="submit-btn" type="submit">Update</button>
                </form>
            </div>
        </section >
    )
}