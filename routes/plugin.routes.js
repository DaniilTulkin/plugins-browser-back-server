const { Router } = require('express')

const controller = require('../controllers/plugin.controller')

const router = Router()

router.get('/:className', controller.run)

module.exports = router