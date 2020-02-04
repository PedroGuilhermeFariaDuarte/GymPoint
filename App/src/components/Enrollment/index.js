import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO, setMonth, getMonth } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parse } from 'query-string';
import PropTypes from 'prop-types';

// Services
import api from '../../services/api';

// Global Components
import Header from '../Header';
import SubHeader from '../SubHeader';
import Select from '../AsyncSelect';

// Styles Global
import Container from '../../styles/global_container';

// Styles
import { FormContainer, GroupOfInput, Group } from './styles';

// Utils
import { schemaEnrollment } from '../../utils/schema';
import { formatPrice } from '../../utils/format';

// Actions Redux
import * as PlanoActions from '../../redux/reducers/Planos/action';

function Enrollments({ history, location }) {
    // Dados da matricula
    const [enrollments, setEnrollments] = useState({});

    // ID da matricula
    const [idEnrollment, setIdEnrollment] = useState(null);

    const [loading, setLoading] = useState(false);

    // Dados do aluno a ser vinculado á matricula
    const [studentEnrollment, setStudentEnrollment] = useState({});

    // Dados de inicio e termino da matricula
    const [dataPlan, setDataPlan] = useState({});

    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    const plansOptionsSelected = useSelector(state => state.Planos);

    const dispatch = useDispatch();

    function handlerIdPlan() {
        const params = parse(location.search);
        return params.id;
    }

    async function handlerUpdateEnrollment() {
        try {
            console.log({
                start_date: dataPlan.start_date,
                plan_id: plansOptionsSelected.value,
            });

            setLoading(true);
            const response = await api.put(
                `/enrollments/${idEnrollment}`,
                {
                    start_date: dataPlan.start_date,
                    plan_id: plansOptionsSelected.value,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            const updateEnrollment = response.data;
            if (updateEnrollment.code && updateEnrollment.code === 6) {
                console.log(updateEnrollment);
                toast.error(updateEnrollment.message);
                return;
            }

            toast.success('Matricula atualizada com sucesso!');
            setLoading(false);
        } catch (error) {
            console.tron.log(error);
            toast.error(error.message);
        }
    }

    /**
     * Cadastra todos os dados do formulario no banco de dados
     * @param {Form} data recebe todos um objeto (chave:valor) representado todos os input do formulario
     *
     */
    async function handlerCreateEnrollment() {
        try {
            setLoading(true);
            const response = await api.post(
                `/enrollments`,
                {
                    start_date: dataPlan.start_date,
                    plan_id: plansOptionsSelected.value,
                    student_id: studentEnrollment.id,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            const newEnrollment = response.data;
            if (newEnrollment.code && newEnrollment.code === 6) {
                console.log(newEnrollment);
                toast.error(newEnrollment.message);
                return;
            }

            toast.success('Matricula criada com sucesso!');
        } catch (error) {
            console.tron.log(error);
            toast.error(error.message);
        }
    }

    /**
     * Carrega todos os dados da matricula
     */
    async function handlerLoadEnrollment() {
        try {
            setLoading(true);
            const response = await api.get(`/enrollments/${idEnrollment}`, {
                headers: {
                    authorization: token,
                },
            });

            const enrollmentData = response.data;

            if (enrollmentData.code && enrollmentData.code === 6) {
                toast.error(enrollmentData.message);
                setLoading(false);
                return;
            }

            const { active, start_date, end_date, id } = enrollmentData;
            const { nome, idStudent } = enrollmentData.student;
            const { title, duration, price } = enrollmentData.plan;

            setEnrollments({
                active,
                start_date: format(parseISO(start_date), "dd'/'mm'/'yyy"),
                end_date: format(parseISO(end_date), "dd'/'mm'/'yyy"),
                id,
                name: nome,
                title,
                planID: enrollmentData.plan.id,
            });

            setStudentEnrollment({
                name: nome,
                id: idStudent,
            });

            dispatch(
                PlanoActions.setPlano({
                    label: title,
                    color: '#EE4D64',
                    value: enrollments.planID,
                    duration,
                    price,
                })
            );

            setDataPlan({
                start_date,
                end_date,
            });

            setLoading(false);
        } catch (error) {
            toast.error('Não foi possivel recuperar os dados das matriculas!');
        }
    }

    /**
     * Verifica se os dados do formulario são para um novo cadastro ou atualização de uma matricula
     * conforme for a situação, um metodo adquado será chamado recebendo todo os dados do formulario
     */
    async function handlerSubmit(data) {
        try {
            if (idEnrollment) {
                await handlerUpdateEnrollment(data);
                return;
            }

            await handlerCreateEnrollment(data);
        } catch (error) {
            toast.error('Naõ foi possivel cadastrar o usuario');
        }
    }

    /**
     * Procura pelo usuario informado no campo "NOME", caso o usuario não exista, o adminstador será informado
     * e campo contendo o nome do usuario será limpo
     * @param {form} data recebe o nome do usuario
     */
    async function handleSelectStudent(data) {
        try {
            setLoading(true);
            const response = await api.get('/students/', {
                params: {
                    nameStudent: data.name,
                },
                headers: {
                    authorization: token,
                },
            });

            const studentData = response.data;
            if (studentData.code && studentData.code === 6) {
                toast.error(studentData.message);
                setLoading(false);
                return;
            }

            if (studentData.length > 0) {
                setStudentEnrollment({
                    nome: studentData[0].nome,
                    id: studentData[0].id,
                });
                return;
            }

            setStudentEnrollment({ ...studentEnrollment, name: '' });
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    /**
     * Caso exista uma query string contendo o ID da matricula, a mesma será carregada no formulario
     */
    useEffect(() => {
        setIdEnrollment(handlerIdPlan());
    }, []);

    /**
     * Caso exista uma query string contendo o ID da matricula, a mesma será carregada no formulario
     */
    useMemo(async () => {
        if (idEnrollment) {
            await handlerLoadEnrollment();
        }
    }, [idEnrollment]);

    useMemo(async () => {
        if (studentEnrollment.name) {
            await handleSelectStudent(studentEnrollment);
        }
    }, [studentEnrollment.name]);

    /**
     * Atualiza a data final da matricula caso a data de inicio
     *  ou o option sejam alterados
     */
    useMemo(() => {
        if (dataPlan.start_date) {
            const start_date = parseISO(dataPlan.start_date);

            const endDate = setMonth(
                start_date,
                getMonth(start_date) + Number(plansOptionsSelected.duration)
            );

            setDataPlan({
                ...dataPlan,
                end_date: format(endDate, 'yyyy-MM-dd'),
            });
        }
    }, [dataPlan.start_date, plansOptionsSelected.duration]);

    return (
        <>
            <Header />
            <Container>
                <SubHeader
                    history={history}
                    titlePage={
                        idEnrollment
                            ? 'Edição de matricula'
                            : 'Cadastro de matricula'
                    }
                    nextPageName="VOLTAR"
                    nextPageRoute="enrollment"
                    callBackPage
                />
                <FormContainer>
                    <Form
                        initialData={enrollments}
                        onSubmit={handlerSubmit}
                        schema={schemaEnrollment}
                    >
                        <Input
                            type="text"
                            name="name"
                            placeholder="Buscar aluno"
                            onBlur={e =>
                                setStudentEnrollment({
                                    ...studentEnrollment,
                                    name: e.target.value,
                                })
                            }
                            defaultValue={studentEnrollment}
                        />
                        <GroupOfInput>
                            <Group>
                                <label>PLANO</label>
                                <Select token={token} />
                            </Group>
                            <Group>
                                <label>DATA DE INÍCIO</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    onChange={date =>
                                        setDataPlan({
                                            ...dataPlan,
                                            start_date: date.target.value,
                                        })
                                    }
                                />
                            </Group>
                            <Group>
                                <label>DATA DE TÉRMINO</label>
                                <Input
                                    disabled
                                    type="text"
                                    name="end_date"
                                    value={dataPlan.end_date}
                                />
                            </Group>
                            <Group>
                                <label>VALOR FINAL</label>
                                <Input
                                    disabled
                                    type="text"
                                    name="totalPrice"
                                    placeholder={formatPrice(80)}
                                    value={formatPrice(
                                        plansOptionsSelected.price *
                                            plansOptionsSelected.duration
                                    )}
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

Enrollments.propTyes = PropTypes.shape({
    value: PropTypes.string,
});

Enrollments.defaultProps = {
    value: '',
};

export default Enrollments;
