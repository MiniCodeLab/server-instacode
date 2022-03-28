const { verifyToken, setError } = require('../helpers/utils');
const User = require('../api/users/user.model');

const authorize = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(setError(401, 'Unauthorized'));
    const parsedToken = token.replace('Bearer ', '');
    const validToken = verifyToken(parsedToken, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    // Any error related to the token will be identified as a 401 for security reasons
    return next(setError(401, 'Unauthorized'));
  }
};

module.exports = {
  authorize
};
