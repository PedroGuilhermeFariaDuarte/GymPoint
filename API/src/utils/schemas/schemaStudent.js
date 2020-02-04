import * as Yup from 'yup';

export const schemaStudent = Yup.object().shape({
  email: Yup.string().email(),
  nome: Yup.string(),
  idade: Yup.number(),
  peso: Yup.number(),
  altura: Yup.number(),
});
