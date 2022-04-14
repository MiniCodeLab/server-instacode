const CodeRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');
const {
  create,
  deleteCode,
  getAll,
  getAllUserSnippets,
  getById,
  update,
} = require('./code.controller');

CodeRoutes.get('/', [authorize], getAll);
CodeRoutes.get('/user', [authorize], getAllUserSnippets);
CodeRoutes.get('/:id', [authorize], getById);
CodeRoutes.post('/', [authorize], create);
CodeRoutes.patch('/:id', [authorize], update);
CodeRoutes.delete('/:id', [authorize], deleteCode);

module.exports = CodeRoutes;
