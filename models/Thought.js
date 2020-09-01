const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
	{
		// set custom id to avoid confusion with parent thought _id
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			trim: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) =>
				moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		_id: false,
		id: false,
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) =>
				moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
