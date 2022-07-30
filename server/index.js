require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

//requests
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static'))) //files from static package must share as static, that because we can recieve them bby request
app.use(fileUpload({}))
app.use('/api', router)

//errors handler calls last
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

