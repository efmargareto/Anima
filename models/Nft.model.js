const mongoose = require('mongoose')

const nftSchema = new mongoose.Schema(
  {
    background: {
      type: Array,
      required: true
    },
    clothes: {
      type: Array,
      required: true
    },
    jewels: {
      type: Array,
      required: true
    },
    skin: {
      type: Array,
      required: true
    },
    eyes: {
      type: Array,
      required: true
    },
    head: {
      type: Array,
      required: true
    },
    mouth: {
      type: Array,
      require: true
    },
    image: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
)

const Nft = mongoose.model('Nft', nftSchema)

module.exports = Nft



