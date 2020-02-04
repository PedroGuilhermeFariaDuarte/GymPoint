import Mail from '../../lib/Mail';
class EnrollmentMail {
  get Key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const currentEnrollment = data.currentEnrollment;

    await Mail.sendMail({
      to: `${currentEnrollment.student.nome} <${currentEnrollment.student.email}>`,
      subject: 'Sua matricula no GymPoint',
      template: 'enrollment',
      context: {
        alun: currentEnrollment.student.nome,
        plan: currentEnrollment.plan.title,
        description_price: currentEnrollment.plan.description_price,
        description_duration: currentEnrollment.plan.description_duration,
        totalPrice: currentEnrollment.price,
      },
    });
  }
}

export default new EnrollmentMail();
