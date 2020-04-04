const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		const { email = null, login = null, password = null } = req.body;
		const isEmailExists = await User.findOne({ email });
		const isLoginExists = await User.findOne({ login });

		if (isEmailExists && isLoginExists) {
			res.status(400).json({
				errors: {
					login: 'This login is already registered',
					email: 'This email is already registered',
				},
			});
		} else if (isEmailExists) {
			res.status(400).json({
				errors: {
					email: 'This email is already registered',
				},
			});
		} else if (isLoginExists) {
			res.status(400).json({
				errors: {
					login: 'This login is already registered',
				},
			});
		} else {
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({ login, email, password: hashedPassword });
			await user.save();
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 15 });
			return res.status(200).json({ token, userId: user.id });
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
