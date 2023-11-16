const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', reactionController.createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', reactionController.deleteReaction);

module.exports = router;

