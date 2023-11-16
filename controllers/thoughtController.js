const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      // Update the associated user's thoughts array
      await User.findByIdAndUpdate(newThought.userId, { $push: { thoughts: newThought._id } });
      res.json(newThought);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request body' });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request body' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndRemove(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Remove the thought from the associated user's thoughts array
      await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: deletedThought._id } });
      res.json(deletedThought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createReaction: async (req, res) => {
    try {
      const newReaction = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!newReaction) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(newReaction);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request body' });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const deletedReaction = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!deletedReaction) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(deletedReaction);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = thoughtController;
