const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Record = require('./record')
const Student = require('./student')

const SchoolSchema = new Schema({
  schoolName: String,
  recordsForVerification: [{type: Schema.Types.ObjectId, ref: 'Record'}],
  attachedStudents: [{type: Schema.Types.ObjectId, ref: 'Student'}]
})

module.exports = mongoose.model('School', SchoolSchema);
