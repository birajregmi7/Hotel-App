const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync')
const { saveRedirectUrl } = require('../middleware.js')
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})
router.post('/signup', wrapAsync(async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash('success', 'You have successfully registered');
            console.log(registeredUser);
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/listings');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login',
    saveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),
    async (req, res) => {
        let { username } = req.body;
        req.flash('success', `Welcome back, ${username}!`);
        let redirectUrl = res.locals.redirectUrl || '/listings' // agar hamre res.locals.redirectUrl exist karta hai to use store karwado nahi to '/listings' pe bhejdo
        res.redirect(redirectUrl)
        // Check if redirectUrl exists in the session before redirecting
        // const redirectUrl = req.session.returnTo || '/listings';

        // res.redirect(redirectUrl);
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have successfully logged Out');
        res.redirect('/listings');
    });
});

module.exports = router;