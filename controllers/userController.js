const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res) =>{
    const {Name, Password} = req.body;

    //check
    if (!Name || !Password) 
    return res.status(400).json({ message: "Missing fields" });

    //generate salt and hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    //store in db
    const savedUser = new User({Name, Password : hashedPassword});
    await savedUser.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });
    console.log(req.body); // Check what exactly is coming in


};

const loginUser = async(req, res) =>{
    try {
    const {Name, Password} = req.body;

    //find user in db
    const findUser = await User.findOne({ Name });
    if (!findUser) throw new Error('user not found chump')

    //compare provided pass with db
    const isMatch = await bcrypt.compare(Password, findUser.Password);
    if(!isMatch) throw new Error("wrong password")

    const generateToken = (userId) =>{
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  };

  const token = generateToken(findUser._id);
  res.status(200).json({ message: "Login successful", token });
  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {registerUser, loginUser}