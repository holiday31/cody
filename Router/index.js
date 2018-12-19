const multer = require('multer');
// 기타 express 코드
let storageSetting = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'public/');
  },
  filename: function(req, file, callback) {
    callback(null,  Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storageSetting});
const router = require('express').Router();
const controller = require('./Controller/controller');

router.get('/', controller.main);
router.get('/proc/main', controller.mainList);

router.get('/proc/hotA', controller.hotA);
router.get('/proc/newB', controller.newB);
router.get('/proc/hotB', controller.hotB);
router.get('/feed', controller.feed);
router.get('/proc/feed', controller.feedload);
router.get('/feed2', controller.feed2);
router.get('/proc/feed2', controller.feedload2);
// router.get('/proc/comment', controller.comment);
router.post('/proc/cmtcreate', controller.cmtcreate);
// router.get('/proc/like', controller.like);
// router.get('/proc/dislike', controller.dislike);

router.get('/login', controller.loginGET);
router.get('/logout', controller.logout);
router.get('/join', controller.joinGET);
router.get('/post',controller.postGET);
router.get('/search', controller.searchGET);
router.post('/proc/search', controller.searchList);
router.get('/myprofile', controller.myprofileGET);
router.get('/proc/myprofile', controller.profileList);
router.get('/like', controller.likeGET);
router.post('/login', controller.loginPOST);
router.post('/join', controller.joinPOST);
// router.post('/imgupload',upload.single('img'), controller.imgupload);
router.post('/post',upload.single('img'), controller.postPOST);

module.exports = router;
//upload.single('img'),
