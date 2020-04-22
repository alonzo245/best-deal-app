import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Categories.scss'
import { client } from '../../Utils/Client'



export const Categories = () => {
    const [categories, setCategories] = useState(null)
    const [category, setCategory] = useState({
        name: '',
        icon: '',
        categoryId: '',
        route: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

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
            route: ''
        })
    }

    const handleEdit = id => {
        const filterCategories = [...categories]
        // console.log(id, filterCategories.filter(cat => +cat.categoryId === +id)[0])
        setCategory(filterCategories.filter(cat => +cat.categoryId === +id)[0])

    }

    const handleSubmit = async e => {
        e.preventDefault();

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
                    <button className="submit-btn" type="submit">Update</button>
                </form>
            </div>
        </section >
    )
}