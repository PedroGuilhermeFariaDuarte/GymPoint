import HelpOrders from '../models/HelpOrders';
import Students from '../models/Students';
import { Op } from 'sequelize';
import { parseISO } from 'date-fns';

// Jobs
import HelpOrdersMail from '../jobs/HelpOrdersMail';
import Queue from '../../lib/Queue';

class HelpOrdersController {
  async store(req, res) {
    try {
      const newHelp = await HelpOrders.create({
        student_id: req.idStudent,
        question: req.body.question,
      });

      return res.json(newHelp);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }

  async show(req, res) {
    try {
      const myHelps = await HelpOrders.findAll({
        where: {
          student_id: { [Op.eq]: req.idStudent },
        },
        include: [
          {
            model: Students,
            as: 'student_help',
            attributes: ['nome', 'email', 'idade'],
          },
        ],
        attributes: ['id', 'question', 'answer_description'],
      });

      if (!myHelps) {
        return res.json({ code: 6, message: 'Nenhum auxílio foi encontrado!' });
      }

      return res.json(allHelps);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }

  async update(req, res) {
    try {
      const helpExists = await HelpOrders.findByPk(req.params.idAnswer, {
        include: [
          {
            model: Students,
            as: 'student_help',
            attributes: ['nome', 'email', 'idade'],
          },
        ],
        attributes: ['id', 'question', 'answer', 'answer_at'],
      });

      if (!helpExists) {
        return res.json({ code: 6, message: 'Nenhum auxílio encontrado!' });
      }

      helpExists.update(
        {
          answer: req.body.answer,
          answer_at: parseISO(req.body.answer_at),
        },
        { where: { id: { [Op.eq]: req.params.idAnswer } } }
      );

      Queue.add(HelpOrdersMail.key, { helpExists });

      return res.json(helpExists);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }

  async delete(req, res) {
    return res.json();
  }

  async index(req, res) {
    try {
      const allHelps = await HelpOrders.findAll({
        where: {
          answer: { [Op.eq]: null },
          [Op.and]: { answer_at: { [Op.eq]: null } },
        },
        include: [
          {
            model: Students,
            as: 'student_help',
            attributes: ['nome', 'email', 'idade'],
          },
        ],
        attributes: ['id', 'question', 'answer_description'],
      });

      if (!allHelps) {
        res.json({
          code: 6,
          message: 'Todos os auxílios já foram respondidos',
        });
      }

      return res.json(allHelps);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
}

export default new HelpOrdersController();
