const { Thought, User } = require('../models');

const thoughtController = {
	// get all thoughts
	getAllThought(req, res) {
		Thought.find({})
			.select('-__v')
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	// get thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.select('-__v')
			.then((dbThoughtData) => {
				//if no thought is found, send 404
				if (!dbThoughtData) {
					res.status(404).json({
						message: 'No thought found with this id!',
					});
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// add new thought to user
	addThought({ body }, res) {
		console.log(body);
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found with this id!',
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// add reaction to thought
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No thought found with this id!',
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// update thought by id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: 'No thought found with this id!',
					});
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	// delete thought from user
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedThought) => {
				if (!deletedThought) {
					return res
						.status(404)
						.json({ message: 'No thought found with this id!' });
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found with this id!',
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// delete reaction from thought
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: body.reactionId } } },
			{ new: true }
		)
			.then((dbUserData) => {
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
