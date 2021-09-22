import UserMessage from "../Models/UserModel";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { login, register } from "../Interface/interface";

// for signup
export const createUser = async (req : any, res : any) => {
  const { fname, lname, email, password } = req.body;
  console.log(fname, lname, email, password);
  try {
    const existingUser = await UserMessage.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result: register = await UserMessage.create({
      email,
      password: hashPassword,
      fname: fname,
      lname: lname,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ result, token });
  } catch (error : any) {
    res.status(404).json({ message: error.message });
  }
};

// for login
export const loginUser = async (req : any, res : any) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log(process.env.JWT_SECRET_KEY)
  try {
    const existingUser : any = await UserMessage.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Your username and/or password do not match" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error : any) {
    res.status(404).json({ message: error.message });
  }
};
