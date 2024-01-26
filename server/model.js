const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    yojenSchedule: [
        {
          indexNumber: { type: Number, required: true },
          type: { type: String, default: 'NA' },
          description: { type: String, default: '' },
          color: { type: String, default: 'grey' },
        }
      ],
      shivenSchedule: [
        {
          indexNumber: { type: Number, required: true },
          type: { type: String, default: 'NA' },
          description: { type: String, default: '' },
          color: { type: String, default: 'grey' },
        }
      ]
  });
  
 
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  
  module.exports = Schedule;