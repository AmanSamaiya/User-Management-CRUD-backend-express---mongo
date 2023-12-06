const bcrypt = require("bcrypt");
const User = require("../models/userModels.js");

const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Name,Email and Password are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    var hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Name,Email and Password are required");
  }

  try {
    const user = await User.find({ name });
    if (!user) {
      throw new Error("User not found");
    }
    if (user) {
      if (user[0].email != email) {
        throw new Error("Invalid Email");
      }

      bcrypt.compare(password, user[0].password, function (err, result) {
        if (err) throw err;
        if (result) {
          console.log("Match!");
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
          });
        } else {
          console.log("No match!");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
