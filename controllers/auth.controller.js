const User = require('../models/User')

module.exports.register = async function(req, res) {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({
                message: 'User is already exists'
            })
        }

    }
    catch (e) {
        res.status(500).json({
            message: 'Registeration error'
        })
    }
}