const express = require('express')

const logger = require('morgan')
const helmet = require('helmet')

const ProjectsRouter = require('./projects/projects-router.js')
const ActionsRouter = require('./actions/actions-router.js')
const server = express()

const bodyParser = express.json()
server.use(express.json())

server.use(logger('dev'))
server.use(helmet())

server.use('/api/projects', ProjectsRouter)
server.use('/api/actions', ActionsRouter)




server.use(bodyParser)

server.get('/', (req, res) => {
    res.send(`Web Api Sprint Challenge - Travis Little`)
})












module.exports = server