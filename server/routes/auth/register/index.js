const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
	try {
		const { email = null, login = null, password = null } = req.body;
		const isEmailExists = await User.findOne({ email });
		const isLoginExists = await User.findOne({ login });

		if (isEmailExists && isLoginExists) {
			res.status(401).json({
				errors: {
					login: 'This login is already registered',
					email: 'This email is already registered',
				},
			});
		} else if (isEmailExists) {
			res.status(401).json({
				errors: {
					email: 'This email is already registered',
				},
			});
		} else if (isLoginExists) {
			res.status(401).json({
				errors: {
					login: 'This login is already registered',
				},
			});
		} else {
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({ login, email, password: hashedPassword });
			await user.save();
			res.status(200).json({
				message: 'Successfully registered',
			});
		}
	} catch (e) {
		console.log(e.message);
		res.status(500).json({
			errors: {
				common: 'Registration error',
			},
		});
	}
};
