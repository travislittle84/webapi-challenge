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
router.post('/', async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({ message: "There was an error creating project",
    error: err} )
    }
})

// UPDATE (PUT) a PROJECT
router.put('/:id', async (req, res) => {
    try {
        const changes = req.body
        const { id } = req.params
        console.log("id", id)
        console.log("changes", changes)
        
        const updatedProject = await Projects.update(id, changes)
        console.log("UPDAWTED PROJECT", updatedProject)
        if (!updatedProject) {
            throw {
                message: `Could not find project with ID: ${id} provided`,
            }
        }
        res.status(200).json(updatedProject)
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({ 
            message: "There was an error updating project",
            error: err
        })
    }
})

// DELETE a PROJECT
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedProject = await Projects.remove(id)
        if(deletedProject > 0){
            res.status(200).json({ message: `${deletedProject} project(s) deleted`})
        } else {
            throw {
                message: `Could not find project with ID: ${id}`
            }
        }
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({ 
            message: "There was an error deleting project",
            error: err
        })
    }
})

module.exports = router
