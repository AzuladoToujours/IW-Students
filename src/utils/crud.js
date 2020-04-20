const getOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({ _id: req.params.studentId })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).json({ error: 'Id inválida' });
    }

    res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: 'Id inválida' });
  }
};

const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find().lean().exec();

    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ message: 'Estudiante creado exitosamente!' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: req.params.studentId,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    return res
      .status(200)
      .json({ message: 'Estudiante actualizado exitosamente' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: 'Id inválida' });
  }
};

const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.studentId,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res
      .status(200)
      .json({ message: 'Estudiante removido exitosamente' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: 'Id inválida' });
  }
};

module.exports = crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
