const Code = require('./code.model');
const { setError } = require('../../helpers/utils');

const SNIPPET_PAGE_SIZE = 5;

const getAll = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * SNIPPET_PAGE_SIZE;

    // Calculamos si quedan codes por cargar en la paginación
    const totalCodes = await Code.count();
    const codesDelivered = SNIPPET_PAGE_SIZE * page;
    const hasCodesPending = totalCodes - codesDelivered > 0;

    const codes = await Code.find()
      .sort({
        createdAt: 'desc'
      })
      .populate('author')
      .skip(skip)
      .limit(SNIPPET_PAGE_SIZE);

    return res.status(200).json({
      message: 'Recovered all codes',
      data: { codes, nextPage: hasCodesPending ? page + 1 : undefined }
    });
  } catch (error) {
    console.log(error.message);
    return next(setError(500, 'Failed to retrieve all codes'));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const code = await Code.findById(id).populate('author', 'username');
    if (!code) return next(setError(404, 'Code not found'));

    return res.status(200).json({
      message: 'Retrieved code by id',
      data: { code: code }
    });
  } catch (error) {
    return next(setError(500, 'Failed to retrieve code'));
  }
};

const create = async (req, res, next) => {
  try {
    const code = new Code({ ...req.body, author: req.user._id });
    const codeInBd = await code.save();

    return res.status(201).json({
      message: 'Created new code',
      data: { code: codeInBd }
    });
  } catch (error) {
    console.log(error);
    return next(setError(500, error.message | 'Failed to create code'));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const code = new Code(req.body);
    code._id = id;
    const updatedCode = await Code.findByIdAndUpdate(id, code);
    if (!updatedCode) return next(setError(404, 'Code not found'));
    return res.json({
      status: 201,
      message: 'Code updated',
      data: { code: updatedCode }
    });
  } catch (error) {
    return next(setError(500, 'Failed to update code'));
  }
};

const deleteCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCode = await Code.findByIdAndDelete(id);
    if (!deletedCode) return next(setError(404, 'Code not found'));

    return res.json({
      status: 200,
      message: 'Code deleted',
      data: { code: deletedCode }
    });
  } catch (error) {
    return next(setError(500, 'Failed to delete code'));
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteCode
};
