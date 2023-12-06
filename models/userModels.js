const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxLength: [30, "name must be less than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    maxLength: [30, "email must be less than 30 characters"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    maxLength: [30, "password must be less than 30 characters"],
  },
});

userSchema.set("validateBeforeSave", false);

module.exports = mongoose.model("User", userSchema);
