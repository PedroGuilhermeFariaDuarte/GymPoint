import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';

// Services
import api from '../../services/api';

// Global components
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

// Styles Global
import Container from '../../styles/global_container';
import { TableStudents } from '../../styles/global-table';
import {
    ContainerOwner,
    ContainerAlert,
    AlertHeader,
    GroupButton,
} from '../../styles/container_owner';

function Enrollment({ history }) {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [enrollmentSelected, setEnrollmentSelected] = useState({});
    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    function handlerUpdate(id) {
        history.push(`/myenrollment?id=${id}`);
    }

    async function handlerDelete(id) {
        try {
            setLoading(true);
            const response = await api.delete(`/enrollments/${id}`, {
                headers: {
                    authorization: token,
                },
            });

            const enrollmentData = response.data;
            if (enrollmentData.code && enrollmentData.doe === 6) {
                setLoading(false);
                toast.error(enrollmentData.message);
                return;
            }

            setLoading(false);
            toast.success('Matricula deletada com sucesso!');
            setEnrollments(enrollments.filter(i => i.id !== id));
            setEnrollmentSelected({});
        } catch (error) {
            toast.error(
                'Me desculpe!, houve um erro critico. Tente novamente mais tarde'
            );
        }
    }

    useEffect(() => {
        async function enrollmentPlans() {
            try {
                setLoading(true);
                const response = await api.get('/enrollments', {
                    headers: {
                        authorization: token,
                    },
                });
                const enrollmentData = response.data;

                if (enrollmentData.code && enrollmentData.code === 6) {
                    setLoading(false);
                    toast.error(enrollmentData.message);
                    return;
                }
                setLoading(false);
                setEnrollments(enrollmentData);
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }
        enrollmentPlans();
    }, []);
    return (
        <>
            <Header />
            <Container>
                <SubHeader
                    history={history}
                    titlePage="Gerenciando matrículas"
                    nextPageName="CADASTRAR"
                    nextPageRoute="myenrollment"
                    disabledInputSearch={true}
                />
                {loading ? (
                    <AiOutlineLoading size={24} color="#ee4d64" />
                ) : (
                    <>
                        {enrollmentSelected.id && (
                            <ContainerOwner>
                                <ContainerAlert>
                                    <AlertHeader>
                                        <strong>Alerta do sistema!</strong>
                                    </AlertHeader>
                                    <p>
                                        Administrador!, você está preste a
                                        deletar a matricula do aluno{' '}
                                        <strong>
                                            {enrollmentSelected.nome}
                                        </strong>
                                    </p>
                                    <GroupButton>
                                        <button
                                            type="button"
                                            title="Deletar matricula"
                                            onClick={() => {
                                                handlerDelete(
                                                    enrollmentSelected.id
                                                );
                                            }}
                                        >
                                            OK!
                                        </button>
                                        <button
                                            type="button"
                                            title="Não deletar matriculas"
                                            onClick={() => {
                                                setEnrollmentSelected({});
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </GroupButton>
                                </ContainerAlert>
                            </ContainerOwner>
                        )}
                        {enrollments.length > 0 ? (
                            <TableStudents>
                                <thead>
                                    <tr>
                                        <th>ALUNO</th>
                                        <th>PLANO</th>
                                        <th>INÍCIO</th>
                                        <th>TÉRMINO</th>
                                        <th>ATIVA</th>
                                        <th />
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map(enrollment => (
                                        <tr key={enrollment.id}>
                                            <td>{enrollment.student.nome}</td>
                                            <td>{enrollment.plan.title}</td>
                                            <td>{enrollment.inicio}</td>
                                            <td>{enrollment.termino}</td>
                                            <td>
                                                {enrollment.active
                                                    ? 'green'
                                                    : 'red'}
                                            </td>
                                            <td
                                                onClick={() => {
                                                    handlerUpdate(
                                                        enrollment.id
                                                    );
                                                }}
                                            >
                                                <span>editar</span>
                                            </td>
                                            <td
                                                className="active"
                                                onClick={() =>
                                                    setEnrollmentSelected({
                                                        id: enrollment.id,
                                                        nome: enrollment.student.nome.trim(),
                                                    })
                                                }
                                            >
                                                <span>apagar</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </TableStudents>
                        ) : (
                            <strong>Nenhuma matricula por aqui!</strong>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default Enrollment;
