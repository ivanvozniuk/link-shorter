const router = require('express').Router();

const auth = require('./auth');
const user = require('./user');
const link = require('./link');

router.use('/auth', auth);
router.use('/user', user);
router.use('/link', link);

module.exports = router;
