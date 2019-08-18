const express = require('express')
const helmet = require('helmet')

const Projects = require('./data/helpers/projectModel')
const Actions = require('./data/helpers/actionModel')

const server = express()

server.use(helmet())
server.use(express.json())











module.exports = server