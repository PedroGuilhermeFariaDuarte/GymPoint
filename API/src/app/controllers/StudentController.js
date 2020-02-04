import Students from '../models/Students';
import { Op } from 'sequelize';

// Utils
import { schemaStudent } from '../../utils/schemas/schemaStudent';

class StudentController {
  async index(req, res) {
    const { nameStudent } = req.query;

    let options = null;
    try {
      if (nameStudent) {
        options = {
          where: {
            nome: { [Op.like]: nameStudent },
          },
        };
      } else {
        options = {};
      }

      const students = await Students.findAll(options);

      if (!students) {
        return res.json({
          code: 6,
          message: 'Nenhum estudante foi encontrado!',
        });
      }

      return res.json(students);
    } catch (error) {
      return res.json({
        code: 6,
        message:
          'Me desculpe!, houve um erro critico. Tente novamente mais tarde',
      });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;

      const student = await Students.findOne({
        where: {
          id: id,
        },
        attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
      });

      if (!student) {
        return res.json({ code: 6, message: 'Aluno não foi encontrado!' });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.json({
        code: 6,
        message:
          'Me desculpe!, houve um erro critico. Tente novamente mais tarde',
      });
    }
  }
  async store(req, res) {
    const adminID = req.adminID;

    try {
      if (!adminID) {
        return res.json({ code: 6, message: 'Você não tem autorização!' });
      }

      if (!(await schemaStudent.isValid(req.body))) {
        return res.json({
          code: 6,
          message: 'Os dados do aluno estão incorretos',
        });
      }

      const studentsExists = await Students.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (studentsExists) {
        return res.json({
          code: 6,
          message: `O aluno ${req.body.nome} já existe!`,
        });
      }

      const students = await Students.create(req.body);

      if (!students) {
        return res.json({
          code: 6,
          message: 'Não foi possivel cadastrar o aluno! :(',
        });
      }

      return res.status(200).json(students);
    } catch (error) {
      console.log(error);
      return res.json({
        code: 6,
        message:
          'Me desculpe!, houve um erro critico. Tente novamente mais tarde',
      });
    }
  }
  async delete(req, res) {
    try {
      const idStudent = req.params.id;

      const studentExist = await Students.findOne({
        where: {
          id: {
            [Op.eq]: idStudent,
          },
        },
      });

      if (!studentExist) {
        return res.json({
          code: 6,
          message:
            'Não foi possivel deletar este usuário!, parece que ele não existe mais.',
        });
      }

      const studentDeleted = await Students.destroy({
        where: {
          id: {
            [Op.eq]: idStudent,
          },
        },
      });

      if (!studentDeleted) {
        return res.json({
          code: 6,
          message:
            'Me desculpe!, não foi possivel deletar este usuário!, tente novamente.',
        });
      }

      return res.json('Usuario deletado com sucesso!');
    } catch (error) {
      return res.json({
        code: 6,
        message:
          'Me desculpe!, houve um erro critico. Tente novamente mais tarde',
      });
    }
  }
  async update(req, res) {
    try {
      const studentsExists = await Students.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!studentsExists) {
        return res.json({ message: 'Aluno não encontrado' });
      }

      const students = await Students.update(req.body, {
        where: { id: { [Op.eq]: req.params.id } },
      });

      if (!students) {
        return res.json({
          messaage: 'Nao foi possivel atualizar a conta do aluno!',
        });
      }

      return res.status(200).json(students);
    } catch (error) {
      return res.json({
        code: 6,
        message:
          'Me desculpe!, houve um erro critico. Tente novamente mais tarde',
      });
    }
  }
}

export default new StudentController();
