const { all } = require('../config/routes')
const Nft = require('../models/Nft.model')
const jsonNft = require("./../nft.json")

module.exports.create = (req, res, next) => {
  Nft.create(jsonNft)
  res.status(201).json(jsonNft)
}

module.exports.getAllNfts = (req, res, next) => {
  Nft.find()
    .then (nfts => {
      if (!nfts) {
        next(createErro(404, 'Nfts not found'))
      } else {
        res.status(200).json(nfts)
      }
    })
    .catch(next)
} 

module.exports.getFiltersNft = (req, res, next) => {
  Nft.find(req.query)
    .then(data => {
      if (!data) {
        next(createErro(404, 'Nfts not found'))
      } else {
        res.status(200).json(data)
      }
    })
    .catch(next)
}

module.exports.getSubfilters = (req, res, next) => {
  const modelTypes = ['background','clothes','jewels','skin','eyes','head','mouth']
  const allPromise = []

  modelTypes.forEach((elem) => {
    allPromise.push(Nft.distinct(elem))
  })

  Promise.all(allPromise)
    .then( (data) => {
      if(!data) {
        next(createErro(404, 'Nfts subfilters not found'))
      } else {
        let result = {}
        let i = 0
        data.forEach(elem => {
          result = {
            ...result,
            [modelTypes[i++]]: elem
          }
        })
        res.status(200).json(result)
      }
    })
}

