const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')
const User = require('../models/User')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user:req.user.id }).lean()
        const user = await User.findById(req.user.id).select('firstName');
        res.render('dashboard', {
            name: user.firstName,
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
})

module.exports = router