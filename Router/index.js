const multer = require('multer');
// 기타 express 코드
let storageSetting = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(req, file, callback) {
    callback(null,  Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storageSetting});
const router = require('express').Router();
const controller = require('./Controller/controller');

router.get('/', controller.main);
router.get('/login', controller.loginGET);
router.get('/logout', controller.logout);
router.get('/join', controller.joinGET);
router.get('/post',controller.postGET);
router.get('/search', controller.searchGET);
router.get('/myprofile', controller.myprofileGET);
router.get('/like', controller.likeGET);

router.post('/login', controller.loginPOST);
router.post('/join', controller.joinPOST);
// router.post('/imgupload',upload.single('img'), controller.imgupload);
router.post('/post',upload.single('img'), controller.postPOST);

module.exports = router;
//upload.single('img'),
