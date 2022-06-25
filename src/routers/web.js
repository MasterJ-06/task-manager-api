const express = require('express')
const router = new express.Router()

router.get('', (req, res) => {
    res.render('index', {
        title: 'Library',
        name: 'MasterJ'
    })
})

router.get('/task', (req, res) => {
    res.render('tasks', {
        title: 'Tasks',
        name: 'MasterJ'
    })
})

router.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile',
        name: 'MasterJ'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MasterJ'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the Help page',
        name: 'MasterJ'
    })
})

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Help page not found'
    })
})


router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Page not found'
    })
})

module.exports = router