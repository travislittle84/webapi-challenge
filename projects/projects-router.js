const express = require('express')
const Projects = require('../data/helpers/projectModel')

const router = express.Router()


// GET all PROJECTS
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
        
    } catch (err) {
        console.log("ERROR", error)
        res.status(500).json({ message: "There was an error getting projects from the server"} )
    }
    
})

// GET ONE PROJECT
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const project = await Projects.get(id)
        res.status(200).json(project)
    } catch (err) {
        console.log("ERROR", error)
        res.status(500).json({ message: "There was an error getting project from the server"} )
    }
})

// GET Project ACTIONS
router.get('/:id/actions', async (req, res) => {
    try {
        const { id } = req.params
        const actions = await Projects.getProjectActions(id)
        res.status(200).json(actions)
    } catch (err) {
        console.log("ERROR", error)
        res.status(500).json({ message: "There was an error getting ACTIONS for this project"} )
    }
})

// POST a new PROJECT


// UPDATE (PUT) a PROJECT


// DELETE a PROJECT

module.exports = router
