const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

// GET to get all thoughts
router.get('/', thoughtController.getAllThoughts);

// GET to get a single thought by its _id
router.get('/:id', thoughtController.getSingleThought);

// POST to create a new thought
router.post('/', thoughtController.createThought);

// PUT to update a thought by its _id
router.put('/:id', thoughtController.updateThought);

// DELETE to remove a thought by its _id
router.delete('/:id', thoughtController.deleteThought);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', thoughtController.createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
