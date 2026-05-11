import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Section 1: Basic Info
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  telegramUsername: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  location: { type: String, required: true },

  // Section 2: Skills & Experience
  tradingTools: { type: String, required: true },
  specificSkills: { type: String, required: true },
  previousExperience: { type: String, required: true },
  workExperience: { type: String },
  tradingKnowledge: { type: String },
  editingSkills: { type: String },
  socialMediaExperience: { type: String },

  // Section 3: Department Selection
  department: { type: String, required: true },

  // Section 4: Commitment
  hoursPerDay: { type: Number, required: true },
  availableDays: { type: String, required: true },
  hasLaptop: { type: Boolean, required: true },
  hasHighSpeedInternet: { type: Boolean, required: true },
  canWorkRemote: { type: Boolean, required: true },

  // Section 5: Mindset
  sixMonthGoal: { type: String, required: true },
  whyJoin: { type: String, required: true },

  // Section 6: Portfolio & Links
  portfolioUrl: { type: String },
  instagramProfile: { type: String },
  telegramLink: { type: String },
  discordUsername: { type: String },
  youtubeChannel: { type: String },
  previousWorkLinks: { type: String },

  // Section 7: Final Agreement
  seriousCommitment: { type: Boolean, required: true },
  agreedToTerms: { type: Boolean, required: true },
  informationCorrect: { type: Boolean, required: true },
  understoodPhotoRequirement: { type: Boolean, required: true },
  agreedToPhoto: { type: Boolean, required: true },
}, {
  timestamps: true
});

export default mongoose.model('Application', ApplicationSchema);
