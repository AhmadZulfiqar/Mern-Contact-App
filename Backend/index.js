const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer'); // 1. Import Multer
const contact = require('./schema'); 

const app = express();
const port = 3000;

// Setup Multer to store images in an 'uploads' folder
const upload = multer({ dest: 'uploads/' }); 

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Make the uploads folder public

// DATABASE CONNECTION

const mongoURI = process.env.MONGODB_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("Connection error:", err));

app.get('/contacts', async (req, res) => {
  try {
    const allContacts = await contact.find();
    res.json(allContacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.put('/update-contact/:id', async (req, res) => {
  try {
    const updatedContact = await contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ error: "Failed to update contact" });
  }
});


// 2. Add upload.single('img') here. 
// 'img' must match the name used in React: formData.append("img", img)
app.post('/add-contact', upload.single('img'), async (req, res) => {
  try {
    // 1. Check if name and phone are missing before trying to save
    if (!req.body.name || !req.body.phone) {
      return res.status(400).json({ error: "Name and Phone are required" });
    }

    const newContact = new contact({
      name: req.body.name,
      phone: req.body.phone,
      // 2. IMPORTANT FIX: Replace backslashes with forward slashes for the browser
      
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error("Database Error:", err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/delete-contact/:id', async (req, res) => {
  try {
    const deletedContact = await contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
app.get('/contacts/:id', async (req, res) => {
  try {
    const contactData = await contact.findById(req.params.id);  
    if (!contactData) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contactData);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

//For production deployment, you might want to serve the React build from Express as well.
module.exports = app;