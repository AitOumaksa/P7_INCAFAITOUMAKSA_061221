const router = require('express').Router();
//chemin vers le fichier sauce qui ce trouve dans le repertoire controllers (contient tt la logique metier des routes posts)
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//Routage
router.get('/', auth, postsCtrl.getAllPosts);
router.post('/add', auth, multer, postsCtrl.createPost);
router.get('/me', auth, postsCtrl.getUserPost);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, multer, postsCtrl.deletePost);
router.post('/:id/like', auth, postsCtrl.likePost);
router.post('/:id/dislike', auth, postsCtrl.dislikePost);
router.post('/:id/comments', auth, postsCtrl.addComment);
router.put('/:id/updateCmnt', auth, postsCtrl.updateComment);
router.delete('/comments/:id', auth, postsCtrl.deleteComment);

module.exports = router;