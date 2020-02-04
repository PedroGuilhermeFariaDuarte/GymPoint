import Plans from '../models/Plans';
import { Op } from 'sequelize';
class PlanController {
  async show(req, res) {
    try {
      const plans = await Plans.findOne({
        where: { id: req.params.idPlan },
        attributes: ['id', 'title', 'duration', 'price', 'description_price'],
      });

      if (!plans) {
        return res.json({
          code: 6,
          message: 'Este plano não está mais disponivel!',
        });
      }

      return res.json(plans);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async index(req, res) {
    try {
      const plans = await Plans.findAll({
        attributes: ['id', 'title', 'duration', 'price', 'description_price'],
      });

      if (!plans) {
        return res.json({ code: 6, message: 'Nenhum plano está disponivel' });
      }

      return res.json(plans);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async store(req, res) {
    const { title } = req.body;

    try {
      const planExists = await Plans.findOne({
        where: {
          title: {
            [Op.eq]: title,
          },
        },
      });

      if (planExists) {
        return res.json({ code: 6, message: `O plano ${title} já existe!` });
      }

      const plan = await Plans.create(req.body);

      if (!plan) {
        return res.json({
          code: 6,
          message: 'Não foi possivel cadastrar o novo plano!',
        });
      }

      return res.json(plan);
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async update(req, res) {
    try {
      const planAvaiable = await Plans.findOne({
        where: {
          id: { [Op.eq]: req.params.idPlan },
          [Op.and]: {
            title: { [Op.ne]: req.body.title },
          },
        },
      });

      if (!planAvaiable) {
        return res.json({
          code: 6,
          message: 'O plano não está mais disponivel ou o nome dele já existe!',
        });
      }

      await Plans.update(req.body, {
        where: {
          id: req.params.idPlan,
        },
      });

      return res.json({ message: 'Plano atualizado com sucesso!' });
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
  async delete(req, res) {
    try {
      const planExists = await Plans.findOne({
        where: {
          id: { [Op.eq]: req.params.idPlan },
        },
      });

      if (!planExists) {
        return res.json({ code: 6, messagae: 'O plano não existe!' });
      }

      await Plans.destroy({
        where: {
          id: { [Op.eq]: req.params.idPlan },
        },
      });

      return res.json({ message: 'Plano deletado com sucesso!' });
    } catch (error) {
      return res.json({
        code: 6,
        message: 'Desculpe!, houve um erro critico, tent novamente mais tarde!',
      });
    }
  }
}

export default new PlanController();
