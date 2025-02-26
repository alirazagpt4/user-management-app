const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const userModel = require("../models/userModel");
// console.log(userModel);

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const newUser = await userModel.create({
    name,
    email,
    password,
  });
  res.status(201).json({ message: "User created successfully", user: newUser });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true, // ✅ JavaScript access block karega (Secure)
    secure: false, // ✅ Development ke liye false, production me true karein
    sameSite: "lax", // ✅ Cross-site requests allow karein
  });
  res.status(200).json({
    message: "User is logged in ",
    token,
  });
};

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token not found" });
    }

    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (error) {
    console.log("Error in authentication middleware", error);
    throw error;
  }
};

module.exports = { signUp, signIn, authentication };
