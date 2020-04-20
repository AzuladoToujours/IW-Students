const moongose = require('mongoose');

const studentSchema = new moongose.Schema({
  names: {
    type: String,
    required: true,
    trim: true,
  },
  dni: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = moongose.model('Student', studentSchema);
