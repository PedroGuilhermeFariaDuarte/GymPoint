import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

//Actions Redux
import * as SignAccounts from '../../redux/reducers/Auth/actions';

// Services
import api from '../../services/api';

// Assets
import Logo from '../../assets/Logo.png';

// Styles
import { Container, FormContainer } from './styles';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Digite um e-mail valido!')
        .required('O campo e-mail é obrigatorio'),
    password: Yup.string()
        .min(6, 'A senha deve ter no minimo 6(seis) digítos!')
        .required('O campo senha é obrigatorio'),
});

function Login({ history }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function handlerSubmit(data) {
        try {
            setLoading(true);
            const response = await api.post('/authetication', data);

            const adminstrador = response.data;

            if (adminstrador.code === 6) {
                setLoading(false);
                toast.error(adminstrador.message);
                return;
            }

            const { name: nome, email } = adminstrador.user;
            const { token } = adminstrador;

            dispatch(SignAccounts.signInRequest({ nome, email, token }));

            setLoading(false);
            history.push('/home');
        } catch (error) {
            setLoading(false);
            toast.error('Não possivel realizar o login! :(');
        }
    }

    return (
        <Container>
            <FormContainer>
                <img src={Logo} alt="Logo Gympoint" />
                <Form onSubmit={handlerSubmit} schema={schema}>
                    <label>SEU E-MAIL</label>
                    <Input
                        name="email"
                        type="text"
                        placeholder="exemplo@email.com"
                    />
                    <label>SUA SENHA</label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="*************"
                    />
                    <button type="submit">
                        {loading ? (
                            <AiOutlineLoading color="#fff" size={16} />
                        ) : (
                            'Entrar no sistema'
                        )}
                    </button>
                </Form>
            </FormContainer>
        </Container>
    );
}

export default Login;
