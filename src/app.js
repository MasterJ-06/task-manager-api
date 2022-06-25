const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const webRouter = require('./routers/web')
const app = express()
const PathDir = path.join (__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const PartialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(PartialsPath)
// Set up static directory to serve
app.use(express.static(PathDir))
app.use(express.json({limit: '1gb'}));
app.use(express.urlencoded({limit: '1gb'}));
app.use(userRouter)
app.use(taskRouter)
app.use(webRouter)
module.exports = app