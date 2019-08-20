const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const School = ('./school');
const Record = ('./record');

const StudentSchema = new Schema({
 lastName: String, 
 firstName: String,
 activeSchool: {type: Schema.Types.ObjectId, ref: 'School'},
 records: [{type: Schema.Types.ObjectId, ref: 'Record'}]
})

module.exports = mongoose.model('Student', StudentSchema)