const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Student = require('../models/student');
const Record = require('../models/record');
const School = require('../models/school')

router.get('/:schoolid/students', (req, res, next) => {
  let schoolId = req.params.schoolid;
  let studentId = req.query.studentid;

  School.findById(schoolId)
    .exec((err, school) => {
      if(!school) {
        return res.status(404).send('School not found.')
      }else {
          res.send(school.attachedStudents);
      }
    })

})