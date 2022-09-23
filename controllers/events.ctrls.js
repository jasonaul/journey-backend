const db = require('../models')

const index = (req, res) => {
    db.Events.find({}, (error, events) => {
      if(error) return res.status(400).json({ error: error.message });
  
      return res.status(200).json({
        events,
        requestedAt: new Date().toLocaleString()
      });
    });
  };
  

const create = (req, res) => {
    db.Events.create(req.body, (err, createdEvent) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(createdEvent)  //  .json() will send proper headers in response so client knows it's json coming back
    })
}
// destroy a single event by its ID
const destroy = (req, res) => {
    db.Events.findByIdAndDelete(req.params.id, (error, deletedEvent) => {
        //if no event is found, let the frontend know with the json error message
        if(!deletedEvent) return res.status(400).json({error: "Event not found"})
        //if an error is produced, display it
        if(error) return res.status(400).json({error: error.message})
        return res.status(200).json({
            message: `Event ${deletedEvent.name} deleted successfully! `
        })
    })
}


  // updating a single event
  const update = (req, res) => {
    db.Events.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body
      }, 
      { new: true }, 
      (error, updatedEvent) => {
      if(error) return res.status(400).json({ error: error.message });
  
      return res.status(200).json(updatedEvent)
    });
  };
  
  

module.exports = {
    index,
    create,
    destroy,
    update,
}