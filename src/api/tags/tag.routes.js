const TagRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');
const { getAll } = require('./tag.controller');

TagRoutes.get('/', [authorize], getAll);

module.exports = TagRoutes