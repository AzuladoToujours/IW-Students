const express = require('express');
const router = express.Router();
const {
  defaultCrudMethods,
  getCourseStudentsBySemester,
  updateCourseStudentsBySemester,
  averageCourseStudentsBySemester,
} = require('./controllers');
const { getMany, getOne, createOne, updateOne, removeOne } = defaultCrudMethods;
const {
  validations,
  noteValidation,
  studentValidator,
  checkStudentExistence,
} = require('./validator');

//CRUD METHODS
router.get('/', getMany);
router.post(
  '/student',
  validations,
  studentValidator,
  checkStudentExistence,
  createOne
);
router.get('/student/:studentId', getOne);
router.put(
  '/student/:studentId',
  validations,
  studentValidator,
  checkStudentExistence,
  updateOne
);
router.delete('/student/:studentId', removeOne);

//STUDENT METHODS
router.get('/:course/:semester', getCourseStudentsBySemester);
router.get('/average/:course/:semester', averageCourseStudentsBySemester);
router.put(
  '/:course/:semester',
  noteValidation,
  studentValidator,
  updateCourseStudentsBySemester
);

module.exports = router;
