const CodeRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');
const {
  getAll,
  getById,
  create,
  update,
  deleteCode
} = require('./code.controller');

CodeRoutes.get('/', [authorize], getAll);
CodeRoutes.get('/:id', [authorize], getById);
CodeRoutes.post('/', [authorize], create);
CodeRoutes.patch('/:id', [authorize], update);
CodeRoutes.delete('/:id', [authorize], deleteCode);

module.exports = CodeRoutes;
