const Tag = require('./tag.model');

const getAll = async (req, res, next) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags)
    } catch (error) {
        return next(error)
    }
}

module.exports = { getAll }