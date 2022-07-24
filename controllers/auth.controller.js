const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports.register = async function(req, res) {
    try {
        const {login, email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({
                message: 'Registration: user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({login, email, password: hashedPassword})
        await user.save()

        res.status(201).json({
            message: 'Registration: user has been created'
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
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                message: 'Login: user does not exist'
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'Login: password is not correct'
            })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.secret,
            { expiresIn: '30d'}
        )
        res.json({
            token, 
            user: user.login
        }) 
    }
    catch (e) {
        res.status(500).json({
            message: 'Login: internal server error'
        })
    }
}