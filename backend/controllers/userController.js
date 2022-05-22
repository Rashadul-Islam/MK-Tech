import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { role, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    role,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { current, newpass } = req.body;

  const user = await User.findOne({ _id: req.params.id });

  if (user && (await user.matchPassword(current))) {
    let storePass = await bcrypt.hash(newpass, 10);

    const setNew = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: storePass,
        },
      },
    );
    if (setNew) {
      res.status(201).json({
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { authUser, registerUser, changePassword };
