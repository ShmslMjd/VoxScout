import Software from '../models/Software.js';

// Get all software with sorting and filtering options
export const getAISoftware = async (req, res) => {
  try {
    const { 
      category, 
      sort = 'createdAt', 
      order = 'desc',
      limit = 10 
    } = req.query;

    let query = {};
    if (category) query.category = category;

    const softwares = await Software.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .limit(Number(limit));

    res.status(200).json(softwares);
  } catch (error) {
    console.error("Error fetching AI software records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get software by ID
export const getSoftwareById = async (req, res) => {
  try {
    const software = await Software.findById(req.params.id);
    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }
    res.json(software);
  } catch (error) {
    console.error("Error in getSoftwareById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new software
export const createAISoftware = async (req, res) => {
  try {
    const requiredFields = [
      'name',
      'logo',  // Changed from 'imageUrl' to 'logo'
      'profileHeader',
      'developer',
      'category',
      'briefOverview',
      'websiteUrl',
      'company.name',
      'company.contact.email'
    ];

    const missingFields = requiredFields.filter(field => {
      if (field.includes('.')) {
        // Handle nested fields
        const parts = field.split('.');
        let current = req.body;
        for (const part of parts) {
          if (!current || !current[part]) return true;
          current = current[part];
        }
        return false;
      }
      return !req.body[field];
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields
      });
    }

    // Create software with all fields from request body
    const software = new Software(req.body);
    
    // Set default values if not provided
    if (!software.rating) {
      software.rating = { score: 0, totalReviews: 0 };
    }
    if (!software.status) {
      software.status = 'active';
    }

    const savedSoftware = await software.save();
    
    res.status(201).json({
      message: "Software created successfully",
      software: savedSoftware
    });

  } catch (error) {
    console.error("Error creating software:", error);
    res.status(500).json({ 
      message: "Error creating software", 
      error: error.message 
    });
  }
};

// Update software
export const updateAISoftware = async (req, res) => {
  try {
    const updatedSoftware = await Software.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedSoftware) {
      return res.status(404).json({ message: "Software not found" });
    }

    res.status(200).json({
      message: "Software updated successfully",
      software: updatedSoftware
    });
  } catch (error) {
    console.error("Error updating software:", error);
    res.status(500).json({ message: "Error updating software", error: error.message });
  }
};

// Delete software
export const deleteAISoftware = async (req, res) => {
  try {
    const deletedSoftware = await Software.findByIdAndDelete(req.params.id);

    if (!deletedSoftware) {
      return res.status(404).json({ message: "Software not found" });
    }

    res.status(200).json({
      message: "Software deleted successfully",
      software: deletedSoftware
    });
  } catch (error) {
    console.error("Error deleting software:", error);
    res.status(500).json({ message: "Error deleting software", error: error.message });
  }
};

// Add review to software
export const addSoftwareReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    
    if (!userName || !rating || !comment) {
      return res.status(400).json({ message: "Missing required review fields" });
    }

    const software = await Software.findById(req.params.id);
    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    // Add new review
    software.reviews.push({ userName, rating, comment });

    // Update overall rating
    const totalRating = software.reviews.reduce((sum, review) => sum + review.rating, 0);
    software.rating.score = totalRating / software.reviews.length;
    software.rating.totalReviews = software.reviews.length;

    const updatedSoftware = await software.save();

    res.status(200).json({
      message: "Review added successfully",
      software: updatedSoftware
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

/*
export async function getAISoftware(req,res) {
     try {
        const softwares = await Software.find().sort({createdAt: -1}); // sort by newest first
        res.status(200).json(softwares);

     } catch (error) {
        console.error("Error fetching AI software records:", error);

        res.status(500).json({message: "Internal serve error"});
     }
}

export async function getSoftwareById(req, res) {
    try {
        const software = await Software.findById(req.params.id);
        if (!software) {
            return res.status(404).json({message: "Software not found"});
        }else {
            res.json(software);
        }
    } catch (error) {
        console.error("Error in getSoftwareById controller", error);

        res.status(500).json({message: "Internal serve error"});
    }
}

export async function createAISoftware(req, res) {
     try {
        const {softwareName, features} = req.body;
        const note = new Software({softwareName, features});
        
        const savedSoftware = await note.save();
        res.status(201).json(savedSoftware);
     } catch (error) {
        console.error("Error in createSoftware controller:", error);

        res.status(500).json({message: "Internal server error"});
     }
}

export async function updateAISoftware(req, res) {
    try {
        const {softwareName, features} = req.body;
        const updatedSofware = await Software.findByIdAndUpdate(req.params.id, {softwareName, features}, {new: true});

        if(!updatedSofware) return res.status(404).json({message: "Software not found"});

        res.status(200).json(updatedSofware);
    } catch (error) {
        console.error("Error in updateAISoftware controller:", error);

        res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteAISoftware(req, res) {
    try {
        const deletedSoftware = await Software.findByIdAndDelete(req.params.id);

        if(!deletedSoftware) return res.status(404).json({message: "Software not found"});

        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error in updateAISoftware controller:", error);

        res.status(500).json({message: "Internal server error"});
    }
}*/