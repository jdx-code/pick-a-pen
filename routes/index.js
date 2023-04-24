const express = require('express')
const router = express.Router()

// @desc    Login/Landing page
// @route   GET /
router.get('/', (req, res) => {
    res.render('login')
})

// @desc    Dashboard page
// @route   GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router