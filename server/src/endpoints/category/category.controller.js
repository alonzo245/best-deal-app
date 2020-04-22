const Category = require('./category.model');

const injects = ({ logger, cache }) => ({
    /**
     * get all categories
     */
    getCategories: async (req, res, next) => {
        try {
            const cached = await cache.getAsync('categories')
            // const cacheValue = await cache.keysAsync('categories')
            if (cached) {
                return res.status(200).json({ categories: JSON.parse(cached) })
            }

            const categories = await Category.find()
            if (!categories) return res.status(200).json({ categories })

            await cache.setAsync('categories', JSON.stringify(categories))
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
    createCategory: (req, res, next) => {
        const category = new Category({
            ...req.body
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
    updateCategory: (req, res, next) => {
        Category.findById(req.params.id)
            .then(category => {
                category.icon = req.body.icon
                category.name = req.body.name
                category.route = req.body.route
                return category.save();
            })
            .then(() => {
                res.status(200).json({ massage: 'category updated' })
            })
            .catch(err => {
                if (!err.statusCode) err.statusCode = 500;
                next(err)
            });
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