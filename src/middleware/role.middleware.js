const { errorResponse } = require('../utils/response.util');

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return errorResponse(
                res,
                401,
                'Not authorized, user not found'
            );
        }

        if (req.user.role !== role) {
            return errorResponse(
                res,
                403,
                `User role ${req.user.role} is not authorized`
            );
        }

        next();
    };
};

module.exports = roleMiddleware;
