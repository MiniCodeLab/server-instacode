const User = require('./user.model')
const bcrypt = require('bcrypt')
const { generateToken, setError } = require('../../helpers/utils');

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id != req.user.id) return next(setError(403, 'Forbidden'));
        const user = await User.findById(id)
        if (!user) return next(setError(404, 'User not found'));
        delete user.password;
        return res.status(200).json(user)
    } catch (error) {
        return next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const userExist = await User.findOne({ email: newUser.email })
        if (userExist) return next(setError(409, 'This Email already exists'))
        const userInBd = await newUser.save()
        delete userInBd.password;
        return res.status(201).json(userInBd)
    } catch (error) {
        return next(error)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const userInBd = await User.findOne({ email: req.body.email })
        if (!userInBd) return next(setError(404, 'User not found'))
        if (bcrypt.compareSync(req.body.password, userInBd.password)) {
            delete userInBd.password;
            const token = generateToken(userInBd._id, userInBd.email);
            return res.status(200).json({
                user: userInBd,
                token: token
            });
        }
    } catch (error) {
        error.message = 'Login Failed'
        return next(error)
    }

}

module.exports = {
    getById,
    create,
    authenticate
}
