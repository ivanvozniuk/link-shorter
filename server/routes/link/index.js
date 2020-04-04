const router = require('express').Router();
const auth = require('../../middleware/auth');

router.post('/create', auth, require('./create'));
router.get('/all', auth, require('./get-all'));
router.get('/:id', auth, require('./get-single'));

module.exports = router;
