const mongoose = require("mongoose");

const { Schema } = mongoose;

const divisionSchema = new Schema(
  {
    psid: String,
    code: String,
    method: {
      type: String,
      enum: ["manzil", "juz", "hizb"],
    },
    period: {
      type: String,
      enum: ["day", "week", "month"],
    },
    readers: [
      {
        readersPsid: String,
        index: String,
      },
    ],
    selectedIndexes: [String],
    comment: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

divisionSchema.pre("save", function (next) {
  if (!this.code) {
    const lastFiveChar = this._id
      .toString()
      .substring(this._id.toString().length - 5);
    this.code = `takharoubt-${this.method}-${lastFiveChar}`;
  }
  next();
});

module.exports = mongoose.model("Division", divisionSchema);