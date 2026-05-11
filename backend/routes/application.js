import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Application from '../models/Application.js';
import { sendApplicationEmail } from '../services/emailService.js';

const router = express.Router();

// Validation middleware
const validateApplication = [
  body('fullName').trim().notEmpty().withMessage('Full Name is required'),
  body('age').isInt({ min: 16 }).withMessage('Must be at least 16 years old'),
  body('emailAddress').isEmail().withMessage('Valid email is required'),
  body('mobileNumber').notEmpty().withMessage('Mobile Number is required'),
  body('department').notEmpty().withMessage('Department selection is required'),
  body('seriousCommitment').custom(value => value === true).withMessage('Must confirm serious commitment'),
  body('agreedToTerms').custom(value => value === true).withMessage('Must agree to terms'),
  body('informationCorrect').custom(value => value === true).withMessage('Must confirm information is correct'),
  body('understoodPhotoRequirement').custom(value => value === true).withMessage('Must understand photo requirement'),
  body('agreedToPhoto').custom(value => value === true).withMessage('Must agree to provide photo'),
];

// POST /api/applications/apply
router.post('/apply', validateApplication, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let emailSent = false;
    try {
      emailSent = await sendApplicationEmail(req.body);
    } catch (emailError) {
      console.error('Error sending application email:', emailError);
    }

    let id = null;
    let savedToDatabase = false;
    if (mongoose.connection.readyState === 1) {
      const application = new Application(req.body);
      await application.save();
      id = application._id;
      savedToDatabase = true;
    } else {
      console.warn('MongoDB is not connected. Application was not saved to the database.');
    }

    if (!emailSent && !savedToDatabase) {
      return res.status(500).json({
        error: 'Application could not be submitted. Email and database are not available.',
      });
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      id,
      emailSent,
      savedToDatabase,
    });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Server error during submission' });
  }
});

// GET /api/applications (Protected route placeholder)
router.get('/', async (req, res) => {
  // In a real app, you would add JWT middleware here
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching applications' });
  }
});

export default router;
