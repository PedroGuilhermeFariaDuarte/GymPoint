import * as Yup from 'yup';
export const schema = Yup.object().shape({
    nome: Yup.string().required('O campo nome é obrigatorio'),
    email: Yup.string()
        .email('O e-mail digitado não é valido')
        .required('O e-mail é obrigatorio'),
    peso: Yup.number().min(2, 'Seu peso deve ter no minino 2(dois) digitos'),
    altura: Yup.number().min(
        2,
        'A altura do aluno deve ter no minino 2(dois) digitos'
    ),
    idade: Yup.number()
        .min(2, 'A idade do aluno deve ter 2(dois) digitos')
        .required('A idado do aluno é obrigatorio'),
});

export const schemaPlan = Yup.object().shape({
    title: Yup.string().required('O campo Titulo do Plano é obrigatorio'),
    duration: Yup.string().required(
        'O campo duração( Tempo de funcionamento da plano) é obrigatorio!'
    ),
    price: Yup.string('Digite apenas números no campo preço').min(
        2,
        'o preço do plano deve ter no minino 2(dois) digitos'
    ),
});

export const schemaEnrollment = Yup.object().shape({
    name: Yup.string().required(' O campo nome é obrigatorio'),
});
