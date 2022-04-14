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
const rateLimit = require('express-rate-limit')

const codeCreateRateLimit = rateLimit({
	windowMs: 1 * 60 * 1000, // 1min
	max: 2,
	standardHeaders: true,
	legacyHeaders: false,
});

CodeRoutes.get('/', [authorize], getAll);
CodeRoutes.get('/user', [authorize], getAllUserSnippets);
CodeRoutes.get('/:id', [authorize], getById);
CodeRoutes.post('/', [authorize, codeCreateRateLimit], create);
CodeRoutes.patch('/:id', [authorize], update);
CodeRoutes.delete('/:id', [authorize], deleteCode);

module.exports = CodeRoutes;
