const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Issue = require('../models/Issue');
const auth = require('../middleware/authMiddleware');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup Multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});
const upload = multer({ storage: storage });

// @route   POST api/issues
// @desc    Create an issue
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Location is likely sent as stringified JSON if using FormData
    let parsedLocation = {};
    if (location) {
      try {
        parsedLocation = JSON.parse(location);
      } catch (e) {
        // Handle if it's already an object or failed to parse
        parsedLocation = location;
      }
    }

    const newIssue = new Issue({
      title,
      description,
      category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      location: parsedLocation,
      reporter: req.user.id
    });

    const issue = await newIssue.save();
    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/issues
// @desc    Get all issues
// @access  Public
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().populate('reporter', ['name', 'email']).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/issues/:id/upvote
// @desc    Upvote an issue
// @access  Private
router.put('/:id/upvote', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Check if the user has already upvoted
    if (issue.upvotes.some(upvote => upvote.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Issue already upvoted' });
    }

    issue.upvotes.unshift(req.user.id);
    await issue.save();

    res.json(issue.upvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/issues/:id/status
// @desc    Update issue status
// @access  Private (Admin only)
const admin = require('../middleware/adminMiddleware');
router.put('/:id/status', [auth, admin], async (req, res) => {
  try {
    const { status } = req.body;
    console.log('Updating status for issue:', req.params.id, 'to:', status);
    
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      console.log('Issue not found:', req.params.id);
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.status = status;
    await issue.save();

    console.log('Status updated successfully');
    res.json(issue);
  } catch (err) {
    console.error('Status update route error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
