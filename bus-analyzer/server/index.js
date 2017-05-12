require('babel-register')
const app = require('./server.js')
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`))
