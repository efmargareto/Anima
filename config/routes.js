const express = require("express");
const router = express.Router();
const authControler = require('../controlers/auth.controller')
const userControler = require('../controlers/users.controller')

console.log(router)

router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

// Autentificación - Login
router.post('/login', authControler.login)

// User 
// Create
router.post('/create', authControler.create)
router.get('/user/me', userControler.getCurrentUser)
router.get('/user/:id', userControler.getUserById)


module.exports = router