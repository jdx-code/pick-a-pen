const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')
const User = require('../models/User')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})

// @desc    Dashboard page
// @route   GET /dashboard
// router.get('/dashboard', ensureAuth, (req, res) => {
//     console.log(req.user)
//     res.render('dashboard', {
//         name: req.user.firstName
//     })
// })

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user:req.user.id }).lean()
        const user = await User.findById(req.user.id).select('firstName');
        res.render('dashboard', {
            name: user.firstName,
            stories
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

// @desc    Logout user
// @route   /auth/logout

router.get('/logout', (req, res, next) => {
    req.logout( (err) => {
        if(err){return next(err)}
        res.redirect('/')
    })
})

module.exports = router