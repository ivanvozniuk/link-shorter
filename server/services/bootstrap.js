const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const routes = require('../routes');

module.exports = (server, handle) => {
	server.use(bodyParser.json()); // need to be before routes
	server.use(
		bodyParser.urlencoded({
			extended: true,
		}),
	);

	server.use(routes);
	server.get('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
};
