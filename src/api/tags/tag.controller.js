const Tag = require('./tag.model');

const getAll = async (req, res, next) => {
    try {
        const tags = await Tag.find();
        return res.json({
            status: 200,
            message: 'User Info',
            data: { tags: tags }
        });
    } catch (error) {
        return next(setError(500, 'Failed get Tags'))
    }
}

module.exports = { getAll }