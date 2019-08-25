const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const faker = require('faker');
const Student = require('../models/student');
const Record = require('../models/record');
const School = require('../models/school')

//generate fake data for testing
router.get('/generate-fake-data', (req, res, next) => {
  //create 2 schools
  for (let i=0; i<2; i++) {
    let school = new School()
    school.schoolName = `${faker.address.county()} County High School`
    school.save((err) => {
      if (err) throw err
    })
    let student = new Student()

    student.lastName = faker.name.lastName()
    student.firstName = faker.name.firstName()
    student.save();
    school.attachedStudents.push(student);
    student.activeSchool = school;
  }
  for (let i=0; i < 5; i++){
    //create 5 new students
    let student = new Student()

    student.lastName = faker.name.lastName()
    student.firstName = faker.name.firstName()
    student.save((err) => {
      if(err) throw err
    }) 
}
res.end()
})

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

router.post('/record', (req, res, next) => {
  const newRecord = new Record(req.body)
  newRecord.save((err, result) =>{
    if(err) return next(err);

    res.send(newRecord);
  })
})

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