const Link = require('../../../models/Link');

module.exports = async (req, res, next) => {
	try {
		const { id } = req.params;
		const link = await Link.findById(id);
		if (!link) {
			return res.status(404).json({
				errors: { common: 'Link did not found' },
			});
		}
		res.status(200).json(link);
	} catch (e) {
		res.status(500).json({
			errors: {
				common: 'Links are unaccessible now',
			},
		});
	}
};
