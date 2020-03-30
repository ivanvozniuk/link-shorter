const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../models/User');

module.exports = async (req, res, next) => {
	try {
		const { login = null, email = null, password = null } = req.body;
		const loginType = login !== null ? 'login' : email !== null ? 'email' : null;
		console.log(req.body, email, loginType, login);

		let user;

		if (loginType === 'login') {
			user = await User.findOne({ login });
		} else if (loginType === 'email') {
			user = await User.findOne({ email });
		}

		if (!user) {
			return res.status(400).json({
				errors: {
					login: `User with this ${loginType} is not registered`,
				},
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (isPasswordCorrect) {
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 15 });
			return res.status(200).json({ token, userId: user.id });
		} else {
			return res.status(400).json({
				errors: {
					password: 'Password is not correct',
				},
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			errors: {
				common: 'Login error',
			},
		});
	}
};
