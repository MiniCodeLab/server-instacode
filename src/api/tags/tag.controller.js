const Tag = require('./tag.model');

const getAll = async (_req, res, next) => {
  try {
    const tags = await Tag.find();
    return res.json({
      status: 200,
      message: 'Retrieved all tags',
      data: { tags }
    });
  } catch (error) {
    return next(setError(500, 'Failed to retrieve all tags'));
  }
};

module.exports = { getAll };
