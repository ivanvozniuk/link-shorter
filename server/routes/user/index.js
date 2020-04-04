const router = require('express').Router();
const auth = require('../../middleware/auth');

router.get('/current', auth, require('./get-current'));

module.exports = router;
