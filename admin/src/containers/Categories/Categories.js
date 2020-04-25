import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { client } from '../../Utils/Client'
import './Categories.scss'
import { extractFromData } from '../../Utils/Utils'



export const Categories = () => {
    const [method, setMethod] = useState('PATCH')

    const [categories, setCategories] = useState(null)
    const [category, setCategory] = useState({
        name: '',
        icon: '',
        categoryId: '',
        route: '',
        active: '',
    })

    useEffect(() => {
        fetchData()
    }, [method])

    const fetchData = async () => {
        try {
            const response = await client.get('/category')
            console.log(response.data.categories)
            setCategories(response.data.categories)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async e => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })

    }

    const handleAdd = async e => {
        setCategory({
            name: '',
            icon: '',
            categoryId: '',
            route: '',
            active: '',
        })
        setMethod('POST')
        console.log(method)
    }

    const handleEdit = id => {
        const filterCategories = [...categories]
        // console.log(id, filterCategories.filter(cat => +cat.categoryId === +id)[0])
        setCategory(filterCategories.filter(cat => +cat.categoryId === +id)[0])
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
            if (method === 'POST') response = await client.post('/category', formData)
            if (method === 'PATCH') response = await client.patch('/category', formData)
            console.log(response.data)

            setCategories([...categories, formData])
        } catch (error) {
            console.log(error)
        }

    }

    if (!categories) return 'Loading...'

    return (
        <section className="categories-wrapper">

            <div className="categories-list">
                <ul className="list">
                    <li className="addCategory" onClick={handleAdd}>Add Category</li>
                    {categories.map((category, i) => {
                        return (
                            <li key={i} onClick={() => handleEdit(category.categoryId)}>{category.name}</li>
                        )
                    })}
                </ul>
            </div>

            <div className="categories-form">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="route" className="label">
                        Category ID:
                        <input className="input" type="text" name="categoryId"
                            value={category.categoryId} onChange={handleChange} disabled />
                        <input className="input" type="hidden" name="categoryId"
                            value={category.categoryId} onChange={handleChange} disabled />
                    </label>

                    <label htmlFor="route" className="label">
                        Name:
                    <input className="input" type="text" name="name"
                            value={category.name} onChange={handleChange} />
                    </label>

                    <label htmlFor="icon" className="label">
                        Icon
                    <input className="input" type="text" name="icon"
                            value={category.icon} onChange={handleChange} />
                    </label>

                    <label htmlFor="route" className="label">
                        Route:
                        <input className="input" type="text" name="route"
                            value={category.route} onChange={handleChange} />
                    </label>

                    <label htmlFor="active" className="label">
                        Active:
                        <input className="input" type="text" name="active"
                            value={category.active} onChange={handleChange} />
                    </label>
                    <button className="submit-btn" type="submit">Update</button>
                </form>
            </div>
        </section >
    )
}