const path = require('path')
module.exports.themeRoot = path.join(__dirname, 'src/assets/themes/' + (process.env.THEME || 'default'), '/')
