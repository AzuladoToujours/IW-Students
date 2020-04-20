const { check, validationResult } = require('express-validator');
const Student = require('./model');

exports.validations = [
  //NAMES ARE NOT NULL
  check('names', 'Los nombres deben contener entre 1 y 40 carácteres').matches(
    /\w/
  ),
  //DNI NOT NULL
  check('dni', 'La cédula debe contener entre 7 y 10 dígitos').matches(
    /[0-9]{7,10}/
  ),
  //NOTE MUST BE IN THE FORMAT
  check(
    'note',
    'La nota sólo debe contener digitos; un valor decimal y separado por punto, así: 4.5, 1.8, 0.0'
  ).matches(/^([0-9]{1})+\.([0-9]{1})$/),
  //CHECK FOR SEMESTER
  check(
    'semester',
    'El semestre debe ser en formato (2018-1, 2018-2, 2019-1, 2019-2)'
  ).matches(/^[0-9]{4}\-[1-2]{1}$/),
  check('course', 'Ingrese un curso válido').matches(/\w/),
];

exports.noteValidation = [
  //NOTE MUST BE IN THE FORMAT
  check(
    'note',
    'La nota sólo debe contener digitos; un valor decimal y separado por punto, así: 4.5, 1.8, 0.0'
  ).matches(/^([0-9]{1})+\.([0-9]{1})$/),
];

exports.studentValidator = async (req, res, next) => {
  //Check for error
  const errors = validationResult(req);
  //if error show the first one as they happend
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));
    return res.status(400).json({ errors: extractedErrors });
  }
  //Proceed to next middleware
  next();
};

exports.checkStudentExistence = async (req, res, next) => {
  const studentDniExist = req.params.studentId
    ? await Student.findOne({
        dni: req.body.dni,
        _id: { $ne: req.params.studentId },
      })
    : await Student.findOne({ dni: req.body.dni });
  if (studentDniExist) {
    return res
      .status(400)
      .json({ error: 'Ya existe un estudiante con esa dni' });
  } else {
    next();
  }
};
