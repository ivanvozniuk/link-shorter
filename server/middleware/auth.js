const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const { method } = req;
		if (method === 'OPTIONS') {
			return;
		}
		const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer TOKEN
		if (!token) {
			return res.status(401).json({});
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;

		next();
	} catch (e) {
		console.log(e.message);
		return res.status(401).json({ error: e.message });
	}
};
