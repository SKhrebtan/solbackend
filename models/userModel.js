const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Duplicated email...'],
    },
    phone: {
      type: Number,
      required: true,
      unique: [true, 'Duplicate phone number...'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DiscountRequest = model('DiscountRequest', userSchema);

module.exports = DiscountRequest;
