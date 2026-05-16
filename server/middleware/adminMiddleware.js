const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    console.log('Admin check for user ID:', req.user.id);
    const user = await User.findById(req.user.id);
    console.log('User found:', user ? user.email : 'null', 'Role:', user ? user.role : 'n/a');
    
    if (user && user.role === 'admin') {
      next();
    } else {
      console.log('Admin access denied for user:', user ? user.email : 'unknown');
      res.status(403).json({ message: 'Access denied. Admin only.' });
    }
  } catch (err) {
    console.error('Admin middleware error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
