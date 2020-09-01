const router = require('express').Router();
const {
	getAllUser,
	getUserById,
	createUser,
	createFriend,
	updateUser,
	removeUser,
	removeFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(removeUser);

router
	.route('/:userId/friends/:friendId')
	.post(createFriend)
	.delete(removeFriend);

module.exports = router;
