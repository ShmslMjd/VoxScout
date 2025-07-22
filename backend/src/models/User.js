import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' // This generates a default avatar with user's initials
  },
  preferences: {
    budget: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 3000 }
    },
    platforms: {
      windows: { type: Boolean, default: true },
      mac: { type: Boolean, default: false },
      mobile: { type: Boolean, default: false }
    },
    features: {
      textToSpeech: { type: Boolean, default: false },
      voiceCloning: { type: Boolean, default: false },
      realTimeVoiceChange: { type: Boolean, default: false },
      multiLanguage: { type: Boolean, default: false },
      customVoiceCreation: { type: Boolean, default: false },
      apiAccess: { type: Boolean, default: false }
    },
    minRating: { type: Number, default: 4, min: 1, max: 5 }
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Software'
  }],
  comparisonHistory: [{
    softwares: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Software'
    }],
    date: { type: Date, default: Date.now }
  }],
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: { type: Date },
    lockUntil: { type: Date }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add methods to handle login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  // Reset if lock has expired
  if (this.loginAttempts.lockUntil && this.loginAttempts.lockUntil < new Date()) {
    this.loginAttempts = { count: 1, lastAttempt: new Date() };
    await this.save();
    return;
  }

  const updates = {
    $inc: { 'loginAttempts.count': 1 },
    $set: { 'loginAttempts.lastAttempt': new Date() }
  };

  if (this.loginAttempts.count + 1 >= 5) {
    // Lock account for 30 minutes
    updates.$set['loginAttempts.lockUntil'] = new Date(Date.now() + 30 * 60 * 1000);
  }

  await this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = async function() {
  await this.updateOne({
    $set: {
      loginAttempts: { count: 0, lastAttempt: null, lockUntil: null }
    }
  });
};

const User = mongoose.model('User', userSchema);

export default User;