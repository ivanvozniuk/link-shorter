const User = require('../../../models/User');

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({
				errors: { common: 'User did not found' },
			});
		}
		res.status(200).json({ user });
	} catch (e) {
		console.log(error.message);
		res.status(500).json({
			errors: {
				common: 'User error',
			},
		});
	}
};
