const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Facilities', 'Cleanliness', 'Safety', 'Technology', 'Other'],
    required: true 
  },
  imageUrl: { type: String }, // Path to the uploaded image
  location: {
    lat: { type: Number },
    lng: { type: Number },
    description: { type: String } // Optional text description of location
  },
  status: {
    type: String,
    enum: ['Reported', 'In Progress', 'Resolved'],
    default: 'Reported'
  },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactNumber: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);
