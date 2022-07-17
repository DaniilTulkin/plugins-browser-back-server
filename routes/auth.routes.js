const { Router } = require('express')

const controller = require('../controllers/auth.controller')

const router = Router()

router.post('/register', controller.login)

router.post('/login', async (req, res) => {

})

module.exports = router