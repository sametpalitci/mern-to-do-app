const express = require('express');
const router = express.Router();

const { add, get, del, upd } = require('../controllers/task');

router.post('/add', add);
router.get('/get', get);
router.delete('/del', del);
router.put('/upd', upd);

module.exports = router;