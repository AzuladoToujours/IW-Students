const crudControllers = require('../../utils/crud');
const Student = require('./model');

const defaultCrudMethods = crudControllers(Student);

const getCourseStudentsBySemester = async (req, res) => {
  try {
    const docs = await Student.find({
      course: req.params.course,
      semester: req.params.semester,
    })
      .lean()
      .exec();

    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateCourseStudentsBySemester = async (req, res) => {
  try {
    const updatedDoc = await Student.updateMany(
      {
        course: req.params.course,
        semester: req.params.semester,
      },
      { $set: { note: req.body.note } },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ message: 'Estudiantes actualizados correctamente' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const averageCourseStudentsBySemester = async (req, res) => {
  try {
    const studentsBySemester = await Student.find({
      course: req.params.course,
      semester: req.params.semester,
    })
      .lean()
      .exec();

    if (!studentsBySemester || Object.keys(studentsBySemester).length == 0) {
      return res.status(400).json({
        message:
          'No hay estudiantes en ese semestre / curso o parámetros erroneos',
      });
    }

    const average = getAverage(studentsBySemester);
    const semester = studentsBySemester[0].semester;
    const course = studentsBySemester[0].course;

    return res.status(200).json({
      Message: `El promedio del curso ${course} en el semestre ${semester} es de: ${average}`,
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getAverage = (studentsBySemester) => {
  const studentsNumber = Object.keys(studentsBySemester).length;
  let studentNotes = 0;
  studentsBySemester.map(
    (student) => (studentNotes = studentNotes + parseInt(student.note))
  );

  return studentNotes / studentsNumber;
};

module.exports = {
  defaultCrudMethods,
  getCourseStudentsBySemester,
  updateCourseStudentsBySemester,
  averageCourseStudentsBySemester,
};
