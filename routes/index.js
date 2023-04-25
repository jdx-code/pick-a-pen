const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})

// @desc    Dashboard page
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    console.log(req.user)
    res.render('dashboard', {
        name: req.user.firstName
    })
})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router