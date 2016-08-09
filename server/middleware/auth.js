module.exports = {
    requiresLogin,
    requiresRole
}

// Middleware to check if user is logged in
function requiresLogin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(403);
        res.end();
    }
};

// Middleware to check if user has a specific role
function requiresRole(role) {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf(role) !== -1) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
};