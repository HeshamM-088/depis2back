const User = require('../modules/userSchema.js');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 


const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

  const editUser = async (req, res) => {
  
  const { id } = req.params;
  const { userName, email, password } = req.body;

  
  if (!User.findById(id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userName, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const checkPassword = await bycrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email:user.email , userName:user.userName }, process.env.SECRET_KEY);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = new User({ userName, email, password:hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully'  });
  } catch (error) {
    return res.status(500).json({ message: 'Error during sign up', error: error.message });
  }
};

module.exports = { 
  deleteUser,
  editUser,
  getSingleUser,
  getUsers,
  login,
  signup
 };