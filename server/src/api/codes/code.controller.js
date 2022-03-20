const Code = require('./code.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const codes = await Code.find().populate('author', 'username');
        // TODO: Paginación
        res.status(200).json(codes)
    } catch (error) {
        return next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const code = await Code.findById(id).populate('author', 'username');
        if (!code) return next(setError(404, 'Code not found'))
        return res.status(200).json(code)
    } catch (error) {
        return next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const code = new Code(req.body)
        const codeInBd = await code.save()
        return res.status(201).json(codeInBd)
    } catch (error) {
        return next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const code = new Code(req.body);
        code._id = id;
        const updatedCode = await Code.findByIdAndUpdate(id, code)
        if (!updatedCode) return next(setError(404, 'Code not found'))
        return res.status(200).json(updatedCode)
    } catch (error) {
        return next(error)
    }
}

const deleteCode = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedCode = await Code.findByIdAndDelete(id)
        if (!deletedCode) return next(setError(404, 'Code not found'))
        return res.status(200).json(deletedCode)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteCode
}