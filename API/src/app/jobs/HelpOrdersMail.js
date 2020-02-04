import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
class HelpOrdersMail {
  get key() {
    return 'HelpOrdersMail';
  }

  async handle({ data }) {
    const helpExists = data.helpExists;

    await Mail.sendMail({
      to: `${helpExists.student_help.nome} <${helpExists.student_help.email}>`,
      subject: 'GymPoint - respondemos a sua pergunta',
      template: 'helporders',
      context: {
        student: helpExists.student_help.nome,
        question: helpExists.question,
        answer: helpExists.answer,
        answer_at: format(
          parseISO(helpExists.answer_at),
          "dd-MM-yyyy 'ás' HH:mm:ss "
        ),
      },
    });
  }
}

export default new HelpOrdersMail();
