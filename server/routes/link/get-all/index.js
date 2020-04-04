const Link = require('../../../models/Link');

module.exports = async (req, res, next) => {
	try {
		const links = await Link.find({ owner: req.user.userId });
		res.status(200).json({ links });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Links are unaccessible now' });
	}
};
