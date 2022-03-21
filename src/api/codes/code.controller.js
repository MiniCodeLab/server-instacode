const Code = require('./code.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const skip = (page - 1) * 20;
        const codes = await Code.find().populate('author', 'username').skip(skip).limit(20);
        return res.json({
            status: 200,
            message: 'Recovered all codes',
            data: { codes: codes }
        });
    } catch (error) {
        return next(setError(500, 'Failed all codes'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const code = await Code.findById(id).populate('author', 'username');
        if (!code) return next(setError(404, 'Code not found'))
        return res.json({
            status: 200,
            message: 'Recovered all codes',
            data: { code: code }
        });
    } catch (error) {
        return next(setError(500, 'Failed code'))
    }
}

const create = async (req, res, next) => {
    try {
        const code = new Code(req.body)
        const codeInBd = await code.save()
        return res.json({
            status: 201,
            message: 'Created new code',
            data: { code: codeInBd }
        });
    } catch (error) {
        return next(setError(500, 'Failed created code'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const code = new Code(req.body);
        code._id = id;
        const updatedCode = await Code.findByIdAndUpdate(id, code)
        if (!updatedCode) return next(setError(404, 'Code not found'))
        return res.json({
            status: 201,
            message: 'Updated new code',
            data: { code: updatedCode }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated code'));
    }
}

const deleteCode = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedCode = await Code.findByIdAndDelete(id)
        if (!deletedCode) return next(setError(404, 'Code not found'))
        return res.json({
            status: 200,
            message: 'deleted new code',
            data: { code: deletedCode }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted code'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteCode
}