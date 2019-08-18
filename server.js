const express = require('express')

const ProjectsRouter = require('./projects/projects-router.js')
const ActionsRouter = require('./actions/actions-router.js')
const server = express()
const bodyParser = express.json()
server.use(express.json())

server.use('/api/projects', ProjectsRouter)
server.use('/api/actions', ActionsRouter)

server.use(bodyParser)

// const helmet = require('helmet')
// server.use(helmet())

server.get('/', (req, res) => {
    res.send(`Web Api Sprint Challenge - Travis Little`)
})












module.exports = server