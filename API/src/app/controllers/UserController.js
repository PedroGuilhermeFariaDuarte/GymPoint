import User from '../models/Users';

class UserController {
  async index(req, res) {
    const { email } = req.body;

    const admin = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!admin) {
      return res.json({ message: 'O e-mail informado não está cadastrado!' });
    }

    return res.status(200).json({ ...admin, email });
  }
}

export default new UserController();
