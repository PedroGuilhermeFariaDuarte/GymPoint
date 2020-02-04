import Checkins from '../models/Checkins';
import { Op } from 'sequelize';

// Model
import Students from '../models/Students';

class CheckinsController {
  async show(req, res) {
    try {
      const myCheckins = await Checkins.findAll({
        where: {
          student_id: { [Op.eq]: req.idStudent },
        },
        include: [
          {
            model: Students,
            as: 'student_check',
            attributes: ['nome', 'email', 'idade'],
          },
        ],
        attributes: ['created_at'],
      });

      if (!myCheckins) {
        return res.json({
          code: 6,
          message: 'Checkin não encontrado encontrado!',
        });
      }

      return res.json(myCheckins);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }

  async store(req, res) {
    try {
      const allCheckins = await Checkins.findAndCountAll({
        where: {
          student_id: { [Op.eq]: req.idStudent },
        },
      });

      if (Number(allCheckins.count) == 5) {
        return res.json({
          code: 6,
          message: 'Você não pode fazer um novo checkIn',
        });
      }

      const newCheckin = await Checkins.create({
        student_id: req.idStudent,
      });

      return res.json(newCheckin);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async update(req, res) {
    return res.json('');
  }
  async delete(req, res) {
    res.json('');
  }
  async index(req, res) {
    try {
      const checkins = await Checkins.findAll({
        include: [
          {
            model: Students,
            as: 'student_check',
            attributes: ['nome', 'email', 'idade'],
          },
        ],
        attributes: ['created_at'],
      });

      if (!checkins) {
        return res.json({ message: 'Nenhum checkin disponivel' });
      }

      return res.json(checkins);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
}

export default new CheckinsController();
