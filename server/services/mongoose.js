const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const start = async () => {
	try {
		await mongoose.connect(uri, options);
		console.log(`>>> Successfull connect to MongoDB`);
	} catch (err) {
		console.log(`<<< Mongoose error: ${err}`);
	}
};

start();
