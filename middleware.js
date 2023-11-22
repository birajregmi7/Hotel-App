module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'Sorry, you need to login before accessing');
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        // Optionally, you can clear the saved redirectUrl after using it
        // delete req.session.redirectUrl;
    }
    next();
};
