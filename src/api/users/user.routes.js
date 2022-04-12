const UserRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');

const { getById, create, authenticate, getUserData } = require('./user.controller');

UserRoutes.get('/', [authorize], getUserData);
UserRoutes.get('/:id', [authorize], getById);
UserRoutes.post('/', create);
UserRoutes.post('/login', authenticate);

module.exports = UserRoutes;
