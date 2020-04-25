const Category = require('./category.model');

const injects = ({ logger, cache }) => ({
    /**
     * get all categories
     */
    getCategories: async (req, res, next) => {
        try {
            if (process.env.NODE_ENV === 'production') {
                const cached = await cache.getAsync('categories')
                // const cacheValue = await cache.keysAsync('categories')
                if (cached) {
                    return res.status(200).json({ categories: JSON.parse(cached) })
                }
            }

            const categories = await Category.find()
            if (!categories) return res.status(200).json({ categories })

            if (process.env.NODE_ENV === 'production') {
                await cache.setAsync('categories', JSON.stringify(categories))
            }

            return res.status(200).json({ categories })

        } catch (error) {
            logger.error(error)
            error.statusCode = 500
            next(error)
        }
    },

    /**
     * create category
     */
    createCategory: async (req, res, next) => {
        const count = await Category.countDocuments()
        const category = new Category({
            ...req.body,
            categoryId: (+count) + 1
        })

        category.save()
            .then(categories => {
                res.status(200).json(categories)
            })
            .catch(err => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            })
    },

    /**
     * update category
     */
    updateCategory: async (req, res, next) => {
        try {
            console.log('*******************************************', req.body)
            const update = {
                icon: req.body.icon,
                name: req.body.name,
                route: req.body.route,
                active: req.body.active,
            }

            const category = await Category.findOneAndUpdate({ categoryId: req.body.categoryId }, update)
            if (!category) return res.status(400).json({})

            const updated = await category.save()
            if (!updated) return res.status(400).json({})

            res.status(200).json({ massage: 'category updated' })

        } catch (error) {
            console.log(error)
        }
    },

    /**
     * delete category
     */
    deleteCategory: (req, res, next) => {
        Category.findByIdAndRemove(req.params.id)
            .exec()
            .then(() => {
                res.status(200).json({ massage: 'category deleted' })
            })
            .catch(err => {
                if (!err.statusCode) err.statusCode = 500;
                next(err)
            });
    }

})

module.exports = { injects }