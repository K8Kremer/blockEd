const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./student')

const RecordSchema = new Schema({
  digest: String, 
  linkToDoc: String, 
  transactionHash: String, 
  blockHash: String, 
  student: {type: Schema.Types.ObjectId, ref: 'Student'}
})

module.exports = mongoose.model('Record', RecordSchema)