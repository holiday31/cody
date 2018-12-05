const router = require('express').Router();
const controller = require('./Controller/controller');

router.get('/', controller.main);
router.get('/login', controller.loginGET);
router.get('/logout', controller.logout);
router.get('/join', controller.joinGET);
router.post('/login', controller.loginPOST);
router.post('/join', controller.joinPOST);

module.exports = router;
