const User = require('../modules/userSchema.js'); 


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



module.exports = { 
  deleteUser,
  editUser 
 };