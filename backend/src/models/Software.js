import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema(
  {
    // Basic Software Information
    name: {
      type: String,
      required: true,
      index: true
    },
    logo: {
      type: String,
      required: true
    },
    profileHeader: {  // Added profile header
      type: String,
      required: true
    },
    developer: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Text to Speech', 'Voice Cloning', 'Voice Changer', 'Speech to Text'],
      index: true
    },
    briefOverview: {
      type: String,
      required: true
    },
    websiteUrl: {
      type: String,
      required: true
    },
    downloads: {
      type: Number,
      default: 0,
      index: true
    },

    // Ratings and Reviews
    rating: {
      score: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        index: true
      },
      totalReviews: {
        type: Number,
        default: 0
      },
      distribution: {
        five: { type: Number, default: 0 },
        four: { type: Number, default: 0 },
        three: { type: Number, default: 0 },
        two: { type: Number, default: 0 },
        one: { type: Number, default: 0 }
      }
    },
    reviews: [{
      name: String,
      avatar: String,
      profession: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now }
    }],

    // Features and Gallery
    features: [{
      title: {
        type: String,
        required: true
      },
      description: String
    }],
    gallery: [{
      imageUrl: {
        type: String,
        required: true
      },
      caption: String,
      type: {
        type: String,
        enum: ['screenshot', 'demo', 'tutorial']
      }
    }],

    // Technical Details
    platforms: [{
      type: String,
      enum: ['Web', 'Windows', 'Mac', 'Linux', 'iOS', 'Android']
    }],

    // Pricing
    pricing: {
      hasFreeVersion: {
        type: Boolean,
        default: false
      },
      hasFreeTrialPeriod: {
        type: Boolean,
        default: false
      },
      freeTrialDays: Number,
      plans: [{
        name: {
          type: String,
          required: true
        },
        price: {
          amount: Number,
          currency: {
            type: String,
            default: 'USD'
          },
          period: {
            type: String,
            enum: ['monthly', 'yearly', 'one-time']
          }
        },
        features: [String],
        limitations: [String]
      }]
    },

    // Pros and Cons
    prosAndCons: {
      pros: [{
        title: String,
        description: String,
        upvotes: { type: Number, default: 0 }
      }],
      cons: [{
        title: String,
        description: String,
        upvotes: { type: Number, default: 0 }
      }]
    },

    // Company Information
    company: {
      name: {
        type: String,
        required: true,
        index: true
      },
      established: Date,
      companyType: String,
      size: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
      },
      contact: {
        phone: String,
        email: {
          type: String,
          required: true
        },
        website: String,
        address: String
      },
      socialMedia: [{
        platform: {
          type: String,
          enum: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube', 'Discord']
        },
        url: String
      }]
    },

    // Metadata
    status: {
      type: String,
      enum: ['active', 'inactive', 'coming-soon'],
      default: 'active',
      index: true
    },
    tags: [{ 
      type: String,
      index: true 
    }],
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
softwareSchema.index({ 'pricing.plans.price.amount': 1 });
softwareSchema.index({ 'features.title': 'text', 'briefOverview': 'text' });

const Software = mongoose.model("Software", softwareSchema);
export default Software;