// Student's Names: Manuel Lopez, Kinen Ocitti
// File Name: index.ts
// Date: 2023-04-16
import express from 'express'
const router = express.Router()

// GET home page
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home', page: 'home', displayName: '' })
})
router.get('/home', (req, res, next) => {
    res.render('index', { title: 'Home', page: 'home', displayName: '' })
})

// GET projects
router.get('/projects', (req, res, next) => {
    res.render('index', { title: 'Projects', page: 'projects', displayName: '' })
})
// GET services
router.get('/services', (req, res, next) => {
    res.render('index', { title: 'Services', page: 'services', displayName: '' })
})
// GET about us
router.get('/about', (req, res, next) => {
    res.render('index', { title: 'About us', page: 'about', displayName: '' })
})

// GET contacts
router.get('/contact', (req, res, next) => {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' })
})

// GET login
router.get('/login', (req, res, next) => {
    res.render('index', { title: 'Login', page: 'login', displayName: '' })
})

// GET register
router.get('/register', (req, res, next) => {
    res.render('index', { title: 'Register', page: 'register', displayName: '' })
})

// Temp Routes
// GET contact-list
router.get('/contact-list', (req, res, next) => {
    res.render('index', { title: 'Contact-List', page: 'contact-list', displayName: '' })
})
//GET edit
router.get('/edit', (req, res, next) => {
    res.render('index', { title: 'Edit Contact', page: 'edit', displayName: '' })
})

export default router