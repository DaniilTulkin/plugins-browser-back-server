const fs = require('fs')
const path = require('path')

module.exports.run = async function run (req, res) {
    try {
        const className = req.params.className
        const filePath = `assets/dll/${className}.dll`

        if (!fs.existsSync(filePath)) {
			res.status(200).json({
                message: "Run plugin: file doesn't exist"
            })
		}

		const buffer = fs.readFileSync(filePath);
		const bytes = buffer.toJSON().data;
        res.json({bytes})
    }
    catch (e) {
        res.status(500).json({
            message: 'Run plugin: internal server error'
        })
    }
}