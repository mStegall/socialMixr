module.exports.requiresLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(403);
        res.end();
    }
};

module.exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf(role) !== -1) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
};