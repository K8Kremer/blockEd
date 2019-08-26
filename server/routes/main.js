const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const faker = require('faker');
const Student = require('../models/student');
const Record = require('../models/record');
const School = require('../models/school')

//endpoint to update record entry with verified by info
//called by verify on front end
router.put('/record', (req, res, next) => {
  let verifiyingAccount = req.body.verifiedBy;

  Record.findOne({index: req.body.index})
  .exec((err, record) =>{
    record.verifiedBy = verifiyingAccount
    record.save((err, result) =>{
      if(err) return next (err);
      res.send(record)
    })
   
  })
})

//route to create record
//called when record issued on front end
router.post('/record', (req, res, next) => {
  const newRecord = new Record(req.body)
  newRecord.save((err, result) =>{
    if(err) return next(err);

    res.send(newRecord);
  })
})

//route to get records issued by certain account
//called when admin dash page loads and populates issued record table
router.get('/records/:account', (req, res, next) => {
  let account = req.params.account.toLowerCase();
  Record.find({issuedBy: account})
  .exec((err, records) => {
     if(!records){
       return res.status(404).send('No records for this account.')
     }else {
       res.send({records});
     }
  })
});




module.exports = router