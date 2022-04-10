const express = require("express");
const router = express.Router();

console.log(router)

router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

module.exports = router