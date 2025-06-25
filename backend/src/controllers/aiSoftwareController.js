import Software from '../models/Software.js';

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
}