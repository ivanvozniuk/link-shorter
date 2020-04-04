const path = require('path');

const port = process.env.SERVER_PORT || 5000;

const bodyParser = require('body-parser');
const routes = require('../routes');

module.exports = (express) => {
	const app = express();
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true,
		}),
	);

	if (process.env.NODE_ENV === 'production') {
		app.use('/', express.static(path.join(__dirname, '../', 'client', 'build')));

		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
		});
	}

	app.use(routes);

	app.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
};
