const express = require('express')
const Actions = require('../data/helpers/actionModel')

const router = express.Router()


// GET all ACTIONS
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
        
    } catch (err) {
        console.log("ERROR", error)
        res.status(500).json({ message: "There was an error getting actions from the server"} )
    }
    
})

// GET ONE ACTION
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const action = await Actions.get(id)
        res.status(200).json(action)
    } catch (err) {
        console.log("ERROR", error)
        res.status(500).json({ message: "There was an error getting action from the server"} )
    }
})


// POST a new ACTION
    /* READ THIS
    When adding an action, make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
    */
router.post('/', async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({ message: "There was an error creating action",
    error: err} )
    }
})

// UPDATE (PUT) a ACTION
router.put('/:id', async (req, res) => {
    try {
        const changes = req.body
        const { id } = req.params
        console.log("id", id)
        console.log("changes", changes)
        
        const updatedAction = await Actions.update(id, changes)
        if (!updatedAction) {
            throw {
                message: `Could not find action with ID: ${id} provided`,
            }
        }
        res.status(200).json(updatedAction)
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({ 
            message: "There was an error updating action",
            error: err
        })
    }
})

// DELETE an ACTION
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedAction = await Actions.remove(id)
        if(deletedAction > 0){
            res.status(200).json({ message: `${deletedAction} action(s) deleted`})
        } else {
            throw {
                message: `Could not find action with ID: ${id}`
            }
        }
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({ 
            message: "There was an error deleting action",
            error: err
        })
    }
})

module.exports = router