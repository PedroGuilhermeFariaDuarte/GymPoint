import * as Yup from 'yup';

export const schemaAuth = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().min(6),
});
