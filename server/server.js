const express = require('express');
const mongoose = require('mongoose');
const Schedule = require('./model');

const app = express();
const PORT = 8000;
const cors = require('cors')
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://yoji:yoji123@one.htfvy.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {

       await mongoose.connect(uri);
       console.log("Connected");
        
    } catch (error) {
        console.error(error);
    }
}

connect()





// GET endpoint to retrieve the entire schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// POST endpoint to update a cell in the schedule
// POST endpoint to update the entire schedule
app.post('/post/schedule', async (req, res) => {
    const updatedSchedules = req.body;
  
    try {
      let scheduleDoc;
      let isNewDoc = false;
  
      // Check if an _id is provided in the request body
      if (!updatedSchedules._id) {
        // If not provided, check if the document already exists
        scheduleDoc = await Schedule.findOne();
  
        // If it doesn't exist, create a new document with a new ObjectId
        if (!scheduleDoc) {
          scheduleDoc = new Schedule({ _id: new mongoose.Types.ObjectId() });
          isNewDoc = true;
        }
      } else {
        // If _id is provided, fetch the document
        scheduleDoc = await Schedule.findById(updatedSchedules._id);
        // If not found, create a new document
        if (!scheduleDoc) {
          scheduleDoc = new Schedule({ _id: updatedSchedules._id });
          isNewDoc = true;
        }
      }
  
      // Update schedules
      scheduleDoc.yojenSchedule = updatedSchedules.yojenSchedule;
      scheduleDoc.shivenSchedule = updatedSchedules.shivenSchedule;
  
      // Save the document
      const savedDoc = await scheduleDoc.save();
  
      res.json(savedDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
