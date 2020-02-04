import User from '../models/Users';
import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';

// Utils
import { schemaAuth } from '../../utils/schemas/schemaAuth';
class AuthenticationController {
  async store(req, res) {
    try {
      if (!(await schemaAuth.isValid(req.body))) {
        return res.json({ code: 6, message: 'Seus dados estão incorretos!' });
      }

      //Find by Admin
      const admin = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!admin) {
        return res.json({
          code: 6,
          message: 'O endereço de e-mail informado não existe',
        });
      }

      if (!(await User.checkPassword(req.body.password, admin.password_hash))) {
        return res.json({
          code: 6,
          message: 'A senha informada está incorreta!',
        });
      }

      //Generate Token
      const { id, name, email } = admin;

      return res.status(200).json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, Auth.secret, { expiresIn: Auth.expiresIn }),
      });
    } catch (error) {
      console.log(error);
      return res.json({ code: 6, message: error.message });
    }
  }
}

export default new AuthenticationController();
