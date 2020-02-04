import * as Yup from 'yup';
export const schemaEnrollment = Yup.object().shape({
  student_id: Yup.number().required(),
  plan_id: Yup.number().required(),
  start_date: Yup.date().required(),
});
