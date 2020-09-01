const { User } = require('../models');

const userController = {
	// get all users
	getAllUser(req, res) {
		User.find({})
			.select('-__v')
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	// get one user by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate([
				{
					path: 'thoughts',
					select: '-__v',
				},
				{
					path: 'friends',
					select: '-__v',
				},
			])
			.select('-__v')
			.then((dbUserData) => {
				//if no user is found, send 404
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found with this id!',
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// create user
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},
	// add new friend to a user's friend list
	createFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: { _id: params.friendId } } },
			{ new: true, runValidators: true }
		)
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
	// update user by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
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
			.catch((err) => res.status(400).json(err));
	},
	// delete friend from user's friend list
	removeFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true }
		)
			.then((dbUserData) => {
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// delete user
	removeUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found with this id!',
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = userController;
