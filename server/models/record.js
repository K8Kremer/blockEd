const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./student')

const RecordSchema = new Schema({
  index: String,
  digest: String, 
  // linkToDoc: String, 
  // transactionHash: String, 
  // blockHash: String, 
  // student: {type: Schema.Types.ObjectId, ref: 'Student'}
  valid: Boolean,
  verifiedBy: String, 
  issuedBy: String //school Id
})

module.exports = mongoose.model('Record', RecordSchema)