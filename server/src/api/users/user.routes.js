const UserRoutes = require('express').Router();
const { authorize } = require('../../middleware/authorize');

const {
    getById,
    create,
    authenticate } = require('./user.controller');

UserRoutes.get('/:id', [authorize], getById)
UserRoutes.post('/', create)
UserRoutes.post('/login', authenticate)

module.exports = UserRoutes