const router = require('express').Router();
const {
	getAllThought,
	getThoughtById,
	addReaction,
	addThought,
	updateThought,
	removeReaction,
	removeThought,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThought).post(addThought);

router
	.route('/:id')
	.get(getThoughtById)
	.put(updateThought)
	.delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
