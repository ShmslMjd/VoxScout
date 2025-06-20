export function getAllAudio(req,res) {
    res.status(200).send("You just fetched a record");
}

export function createAudio(req, res) {
     res.status(201).json({message: "record created successfully!"});
}

export function updateAudio(req, res) {
    res.status(200).json({message: "record updated successfully!"});
}

export function deleteAudio(req, res) {
    res.status(200).json({message: "record deleted successfully!"});
}