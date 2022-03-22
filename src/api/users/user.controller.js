const User = require('./user.model');
const bcrypt = require('bcrypt');
const { generateToken, setError } = require('../../helpers/utils');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id != req.user.id) return next(setError(403, 'Forbidden'));
    const user = await User.findById(id);
    if (!user) return next(setError(404, 'User not found'));
    return res.json({
      status: 200,
      message: 'User Info',
      data: { user: user }
    });
  } catch (error) {
    return next(setError(500, 'Failed recover user'));
  }
};

const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, 'This Email already exists'));
    const userInBd = await newUser.save();
    return res.status(201).json(userInBd);
  } catch (error) {
    return next(setError(500, 'Failed to create user'));
  }
};

const authenticate = async (req, res, next) => {
  try {
    const userInBd = await User.findOne({ email: req.body.email });
    if (!userInBd) return next(setError(404, 'User not found'));
    if (bcrypt.compareSync(req.body.password, userInBd.password)) {
      const token = generateToken(userInBd._id, userInBd.email);
      return res.status(200).json({
        user: userInBd,
        token: token
      });
    }
  } catch (error) {
    return next(setError(500, 'Unexpected login error'));
  }
};

module.exports = {
  getById,
  create,
  authenticate
};
