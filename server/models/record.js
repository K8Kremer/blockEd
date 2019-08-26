const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RecordSchema = new Schema({
  index: String,
  digest: String, 
  valid: Boolean,
  verifiedBy: String, 
  issuedBy: String, //school Id
  studentName: String,
  fileName: String,
  dateCreated: String
})

module.exports = mongoose.model('Record', RecordSchema)