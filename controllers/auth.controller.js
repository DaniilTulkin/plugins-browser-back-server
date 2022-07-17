const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports.register = async function(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Registration: validation error'
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({
                message: 'Registration: user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(201).json({
            message: 'Registration: user have been created'
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Registration: internal server error'
        })
    }
}

module.exports.login = async function(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Registration: validation error'
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                message: 'Login: user not exists'
            })
        }

        const isMatch = await bcrypt.compare.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'Login: password is not correct'
            })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '30d'}
        )
        res.json({
            token, 
            email: user.email
        }) 
    }
    catch (e) {
        res.status(500).json({
            message: 'Login: internal server error'
        })
    }
}