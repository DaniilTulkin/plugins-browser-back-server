const { Router } = require('express')
const { check } = require('express-validator')

const controller = require('../controllers/auth.controller')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Password is not correct').isLength({min: 6})
    ],
    controller.register)
router.post(
    '/login', 
    [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Password is not correct').isLength({min: 6})
    ],
    controller.login)

module.exports = router