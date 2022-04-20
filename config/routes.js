const express = require("express");
const router = express.Router();
const authControler = require('../controlers/auth.controller')
const userControler = require('../controlers/users.controller')
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
router.post('/user/create', authControler.create)
router.get('/user/me', authMiddleware.isAuthenticated, userControler.getCurrentUser)
router.get('/user/:id', userControler.getUserById)


module.exports = router