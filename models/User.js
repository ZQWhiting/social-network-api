const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/],
		},
		thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
		friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

// UserSchema.pre('remove', function (next) {
// 	this.model('User').remove({ thoughts: this._id }, next);
// 	next();
// });

const User = model('User', UserSchema);

module.exports = User;
