import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { parse } from 'query-string';

// Services
import api from '../../services/api';

// Global Components
import Header from '../Header';
import SubHeader from '../SubHeader';

// Styles Global
import Container from '../../styles/global_container';

import { FormContainer, GroupOfInput, Group } from './styles';

// Utils
import { schema } from '../../utils/schema';

function Student({ history, location }) {
    const [student, setStudent] = useState({});
    const [idStudent, setIdStudent] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    function handlerIdStudent() {
        const params = parse(location.search);
        return params.id;
    }

    async function handlerUpdateStudent() {
        const data = student;
        try {
            const response = await api.put(`/student/${idStudent}`, data, {
                headers: {
                    authorization: token,
                },
            });
            const student = response.data;
            if (student.code && student.code === 6) {
                toast.error(student.message);
                return;
            }
            toast.success('Aluno Atualizado com sucesso!');
        } catch (error) {
            console.tron.log(error);
            toast.error(error.message);
        }
    }

    async function handlerCreateStudent() {
        const data = student;
        try {
            const response = await api.post('/students', data, {
                headers: {
                    authorization: token,
                },
            });
            const student = response.data;
            if (student.code && student.code === 6) {
                toast.error(student.message);
                return;
            }
            toast.success('Aluno cadastrado com sucesso!');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    async function handlerLoadStudent() {
        try {
            setLoading(true);
            const response = await api.get(`/student/${idStudent}`, {
                headers: {
                    authorization:token,
                },
            });

            const studentData = response.data;

            if (studentData.code && studentData.code === 6) {
                toast.error(studentData.message);
                setLoading(false);
                return;
            }

            setStudent(studentData);
            setLoading(false);
        } catch (error) {
            toast.error('Não foi possivel recuperar os dados do estudante!');
        }
    }

    async function handlerSubmit() {
        try {
            if (idStudent) {
                return await handlerUpdateStudent();
            }
            return await handlerCreateStudent();
        } catch (error) {
            console.log(error);
            toast.error('Naõ foi possivel cadastrar o usuario!');
        }
    }

    useEffect(() => {
        setIdStudent(handlerIdStudent());
    }, []);

    useMemo(async () => {
        if (idStudent) {
            await handlerLoadStudent(idStudent);
        }
    }, [idStudent]); // eslint-ignore

    return (
        <>
            <Header />
            <Container>
                <SubHeader
                    history={history}
                    titlePage={
                        idStudent ? 'Edição de aluno' : 'Cadastro de aluno'
                    }
                    nextPageName="VOLTAR"
                    nextPageRoute="home"
                    callBackPage
                />
                <FormContainer>
                    <Form initialData={student} onSubmit={handlerSubmit}>
                        <label>NOME COMPLETO</label>
                        <Input
                            type="text"
                            name="nome"
                            onChange={e =>
                                setStudent({
                                    ...student,
                                    nome: e.target.value,
                                })
                            }
                        />
                        <label>ENDEREÇO DE E-MAIL</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="exemplo@email.com"
                            onChange={e =>
                                setStudent({
                                    ...student,
                                    email: e.target.value,
                                })
                            }
                        />
                        <GroupOfInput>
                            <Group>
                                <label>IDADE</label>

                                <InputMask
                                    name="idade"
                                    mask="99"
                                    onChange={e =>
                                        setStudent({
                                            ...student,
                                            idade: e.target.value
                                                .replace('_', '')
                                                .trim(),
                                        })
                                    }
                                    placeholder={student.idade}
                                />
                            </Group>
                            <Group>
                                <label>PESO (em Kg)</label>
                                <InputMask
                                    type="text"
                                    name="peso"
                                    mask="99.9"
                                    placeholder="80.9"
                                    onChange={e =>
                                        setStudent({
                                            ...student,
                                            peso: e.target.value
                                                .replace('_', '')
                                                .trim(),
                                        })
                                    }
                                />
                            </Group>
                            <Group>
                                <label>Altura</label>
                                <InputMask
                                    type="text"
                                    name="altura"
                                    placeholder="1.90"
                                    mask="9.99"
                                    onChange={e =>
                                        setStudent({
                                            ...student,
                                            altura: e.target.value
                                                .replace('_', '')
                                                .trim(),
                                        })
                                    }
                                    placeholder={student.altura}
                                />
                            </Group>
                        </GroupOfInput>
                        <button type="submit" />
                    </Form>
                </FormContainer>
            </Container>
        </>
    );
}

export default Student;
