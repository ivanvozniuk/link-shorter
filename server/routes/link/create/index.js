const Link = require('../../../models/Link');
const shortid = require('shortid');

module.exports = async (req, res, next) => {
	try {
		const { finalLink } = req.body;

		const existingLink = await Link.findOne({ finalLink });

		if (existingLink) {
			return res.status(200).json({ link: existingLink });
		}

		const code = shortid.generate();

		const middlewareLink = `${process.env.BASE_URL}/redirect/${code}`;

		const link = new Link({ middlewareLink, finalLink, owner: req.user.userId, code });

		await link.save();

		return res.status(201).json({ link });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Creating link is unaccessible now' });
	}
};
