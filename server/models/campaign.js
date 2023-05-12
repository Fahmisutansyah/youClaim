const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema(
  {
    campaignName: {
      type: String,
      required: [true, "Tolong masukan judul untuk campaign"],
    },
    banner: {
      type: String,
    },
    logo: {
      type: String,
    },
    endDate: {
      type: Date,
      required: [true, "Tolong masukan tanggal berakhir nya campaign"],
    },
    slug: {
      type: String,
      required: [true, "Tolong masukan url untuk campaign"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Tolong masukan description untuk campaign"],
    },
    tnc: {
      type: String,
      required: [true, "Tolong masukan tnc untuk campaign"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    waNumber: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    merchantId: {
      type: Schema.Types.ObjectId,
      ref: "Merchant",
      required: [true, "Tolong masukan merchantid"],
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
