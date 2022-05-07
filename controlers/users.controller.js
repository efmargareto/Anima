const createError = require('http-errors')
const User = require('../models/User.model')
const Like = require('../models/Like.model')
const Nft = require('../models/Nft.model')
const mongoose = require('mongoose');

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


// Edit User
module.exports.editUserName = (req, res, next) => {
  let editUser = { 
    name: req.query.nombre ,
    email: req.query.email 
  }

  User.findByIdAndUpdate(req.params.userId, editUser)
    .then((newUser) => {
        res.status(200).json(newUser)
    })
    .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('user/editUser', { errors: error.errors });
    } else {
        next(error);
    }
  });
}


// User Delete
module.exports.deleteUser = (req, res, next) => {

  console.log('dentro del delete User -- ')

  User.findByIdAndDelete(req.params.userId)
      .then((user) => { res.status(200).json(true) })
      .catch(next)
}
    
