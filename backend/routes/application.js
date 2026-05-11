import express from 'express';
import { body, validationResult } from 'express-validator';
import Application from '../models/Application.js';

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

    const application = new Application(req.body);
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', id: application._id });
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
