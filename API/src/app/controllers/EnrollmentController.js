import Enrollment from '../models/Enrollment';
import Plans from '../models/Plans';
import Student from '../models/Students';
import {
  parseISO,
  isBefore,
  setMonth,
  getMonth,
  getDate,
  getDay,
} from 'date-fns';
import { Op } from 'sequelize';

// Jobs
import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

// Utils
import { schemaEnrollment } from '../../utils/schemas/schemaEnrollment';
class EnrollementController {
  async index(req, res) {
    try {
      const enrollments = await Enrollment.findAll({
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['nome'],
          },
          {
            model: Plans,
            as: 'plan',
            attributes: ['title'],
          },
        ],
        attributes: ['id', 'inicio', 'termino', 'active'],
      });

      if (!enrollments) {
        return res.json({ code: 6, message: 'Nenhuma matricula disponivel!' });
      }

      return res.json(enrollments);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async store(req, res) {
    try {
      // Verify if data is correct
      if (!(await schemaEnrollment.isValid(req.body))) {
        return res.json({
          code: 6,
          message: 'Os dados da matricula estão incorretos!',
        });
      }

      // Read date
      const startDate = parseISO(req.body.start_date);

      // Verify date is valid
      if (
        (!isBefore(getDay(startDate), new Date().getDay()) &&
          isBefore(getMonth(startDate), new Date().getMonth())) ||
        isBefore(getDay(startDate), new Date().getDay()) ||
        isBefore(getDate(startDate), new Date().getDate())
      ) {
        return res.json({
          code: 6,
          message: 'A data de inicio da matricula está invalido!',
        });
      }

      // Verify if enrollment already exists
      const alunEnrollmentExists = await Enrollment.findOne({
        where: {
          student_id: { [Op.eq]: req.body.student_id },
          [Op.and]: { plain_id: { [Op.eq]: req.body.plan_id } },
        },
      });

      if (alunEnrollmentExists) {
        return res.json({
          code: 6,
          message:
            'O aluno que está tentando matricular já possui uma matricula!',
        });
      }

      // Get plan selected
      const planSelected = await Plans.findOne({
        where: { id: req.body.plan_id },
        attributes: ['price', 'duration'],
      });

      // Set final date
      const endDate = setMonth(
        startDate,
        Number(getMonth(startDate)) + planSelected.duration
      );

      // Calc total price
      const totalPrice = Number(planSelected.price * planSelected.duration);

      const newEnrollment = await Enrollment.create({
        student_id: req.body.student_id,
        plain_id: req.body.plan_id,
        start_date: startDate,
        end_date: endDate,
        price: totalPrice,
      });

      const currentEnrollment = await Enrollment.findByPk(newEnrollment.id, {
        include: [
          {
            model: Plans,
            as: 'plan',
            attributes: [
              'title',
              'price',
              'duration',
              'description_duration',
              'description_price',
            ],
          },
          {
            model: Student,
            as: 'student',
            attributes: ['nome', 'email'],
          },
        ],
      });

      // Add job on queue
      await Queue.add(EnrollmentMail.key, { currentEnrollment });

      return res.json(currentEnrollment);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async update(req, res) {
    try {
      const startDate = parseISO(req.body.start_date);
      const plan_id = req.body.plan_id;
      const { idEnrolmment } = req.params;

      console.log(startDate, req.body.start_date);

      const existsEnrollment = await Enrollment.findByPk(idEnrolmment, {
        include: [{ model: Plans, as: 'plan', attributes: ['duration'] }],
      });

      if (!existsEnrollment) {
        return res.json({
          code: 6,
          message: 'Nenhuma matricula encontrada! ',
        });
      }

      // Caso a matricula tenha um novo plano
      if (plan_id) {
        // Get plan selected
        const planSelected = await Plans.findOne({
          where: { id: plan_id },
          attributes: ['id', 'price', 'duration'],
        });

        existsEnrollment.plan.duration = planSelected.duration;
        existsEnrollment.plain_id = planSelected.id;
        existsEnrollment.price = planSelected.price;

        // Set final date
        existsEnrollment.end_date = setMonth(
          startDate,
          Number(getMonth(startDate)) + planSelected.duration
        );

        // Calc total price
        existsEnrollment.price = Number(
          planSelected.price * planSelected.duration
        );
      }

      // Caso a matricula tenha uma nova data de inicio
      if (startDate) {
        const durationOfActualPlan = existsEnrollment.plan.duration;

        // Set final date
        existsEnrollment.end_date = setMonth(
          startDate,
          Number(getMonth(startDate)) + durationOfActualPlan
        );
      }

      await Enrollment.update(
        {
          student_id: req.body.student_id,
          plain_id: req.body.plan_id,
          start_date: req.body.start_date,
          end_date: existsEnrollment.end_date,
          price: existsEnrollment.price,
        },
        {
          where: {
            id: { [Op.eq]: idEnrolmment },
          },
        }
      );

      return res.json(existsEnrollment);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }

  async delete(req, res) {
    try {
      const { idEnrolmment } = req.params;

      const enrollment = await Enrollment.destroy({
        where: {
          id: { [Op.eq]: idEnrolmment },
        },
      });

      if (enrollment) {
        return res.json({
          message: 'Matricula deletada com sucesso!',
        });
      }

      return res.json({
        code: 6,
        message: 'Não foi possivel deleta esta matricula!',
      });
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }

  async show(req, res) {
    try {
      const { idEnrolmment } = req.params;
      const enrollment = await Enrollment.findByPk(idEnrolmment, {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['nome'],
          },
          {
            model: Plans,
            as: 'plan',
            attributes: ['title', 'id','price','duration'],
          },
        ],
        attributes: ['id', 'inicio', 'termino', 'active'],
      });

      if (!enrollment) {
        return res.json({ code: 6, message: 'Nenhuma matricula encontrada!' });
      }

      return res.json(enrollment);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
}

export default new EnrollementController();
