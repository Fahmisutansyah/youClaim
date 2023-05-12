const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voucherSchema = new Schema(
  {
    isRedeemed: {
      type: Boolean,
      default: false,
    },
    redeemedDate: {
      type: Date,
    },
    uniqueCode: {
      type: String,
      required: [true, "Tolong masukan unique code untuk voucher"],
      unique: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: [true, "Tolong masukan campaign id untuk voucher6"],
    },
    customerName: {
      type: String,
    },
    domicile: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
