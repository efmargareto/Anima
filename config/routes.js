const express = require("express");
const router = express.Router();
const authControler = require('../controlers/auth.controller')
const userControler = require('../controlers/users.controller')
const nftControler = require('../controlers/nft.controller')
const authMiddleware = require('../middlewares/auth.middleware')

console.log(router)

router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

// Autentificación - Login
router.post('/login', authControler.login)

// User 

// Create
router.post('/user/', authControler.create)
router.get('/user/me', authMiddleware.isAuthenticated, userControler.getCurrentUser)
router.get('/user/:id', userControler.getUserById)
router.get('/user/likes/:userId', userControler.getNftLiked)

// Edit
router.post('/user/editUser/:userId', userControler.editUserName)
router.post('/user/deleteUser/:userId', userControler.deleteUser)

// NFT
router.post('/nft/create', nftControler.create)
router.get('/nft/all', nftControler.getAllNfts)
router.get('/nft/filters', nftControler.getFiltersNft)
router.get('/nft/subfilters', nftControler.getSubfilters)


// Likes
router.post('/nft/like/', userControler.doLike)


module.exports = router