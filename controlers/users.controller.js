const createError = require('http-errors')
const User = require('../models/User.model')
const Like = require('../models/Like.model')
const Nft = require('../models/Nft.model')

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
      if (!user) {
        next(createError(404, 'User not found'))
      } else {
        res.status(200).json(user)
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'))
      } else {
        res.status(200).json(user)
      }
    })
    .catch(next)
}

module.exports.doLike = (req, res, next) => {

  console.log('------ Entra en do Like ---------- ')

  const { nftId, userId } = req.query  

  Like.findOneAndDelete({ producto: nftId, user: userId})
    .then(like => {
      if (like) {
        res.status(200).send({ success : 'Like remove from DDBB'})
      } else {
        return Like.create({ producto: nftId, user: userId })
          .then(() => {res.status(201).send({ success : 'Like added to DDBB' }) })
      }
    })
    .catch(next)
}


module.exports.getNftLiked = (req, res, next) => {

  console.log('getNft Liked', req.params.userId)

  Like.find({ user: req.params.userId })
    .populate('producto')
    .then( (reponse) => {
      console.log('RESPUESTA DEL GET NFT LIKED', reponse)
      res.status(200).json(reponse)

    })


}
