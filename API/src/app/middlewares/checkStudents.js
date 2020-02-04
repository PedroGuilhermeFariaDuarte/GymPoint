import Students from '../models/Students';

export default async (req, res, next) => {
  const studentExists = await Students.findByPk(req.params.idStudent);

  if (!studentExists) {
    return res.status(401).json({ message: 'ID given in URL is not valid' });
  }

  req.idStudent = req.params.idStudent;
  next();
};
