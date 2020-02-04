import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';
import { useSelector } from 'react-redux';

// Global components
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

// Services
import api from '../../services/api';

// Styles Global
import Container from '../../styles/global_container';
import { TableStudents } from '../../styles/global-table';
import {
    ContainerOwner,
    ContainerAlert,
    AlertHeader,
    GroupButton,
} from '../../styles/container_owner';

function Home({ history }) {
    const [students, setStudents] = useState([]);
    const [studentSelected, setStudentSelected] = useState({});
    const [loading, setLoading] = useState(false);
    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    function handlerUpdate(id) {
        history.push(`/student?id=${id}`);
    }

    async function handlerDelete(id) {
        try {
            setLoading(true);
            const response = await api.delete(`/student/${id}`, {
                headers: {
                    authorization: token,
                },
            });

            const studentData = response.data;
            if (studentData.code && studentData.doe === 6) {
                setLoading(false);
                toast.error(studentData.message);
                return;
            }

            setLoading(false);
            toast.success('Usuario deletado com sucesso!');
            setStudents(students.filter(i => i.id !== id));
            setStudentSelected({});
        } catch (error) {
            toast.error(
                'Me desculpe!, houve um erro critico. Tente novamente mais tarde'
            );
        }
    }

    useEffect(() => {
        async function loadStudents() {
            try {
                const response = await api.get('/students', {
                    headers: {
                        authorization: token,
                    },
                });
                const studentData = response.data;

                if (studentData.code && studentData.code === 6) {
                    toast.error(studentData.message);
                    return;
                }

                setStudents(studentData);
            } catch (error) {
                setLoading(false);
                toast.error('Não foi possivel listar os alunos!');
            }
        }
        loadStudents();
    }, []);
    return (
        <>
            <Header />
            <Container>
                <SubHeader
                    history={history}
                    titlePage="Gerenciando alunos"
                    nextPageName="CADASTRAR"
                    nextPageRoute="student"
                    disabledInputSearch={true}
                />
                {loading ? (
                    <AiOutlineLoading size={24} color="#ee4d64" />
                ) : (
                    <>
                        {studentSelected.id && (
                            <ContainerOwner>
                                <ContainerAlert>
                                    <AlertHeader>
                                        <strong>Alerta do sistema!</strong>
                                    </AlertHeader>
                                    <p>
                                        Administrador!, você está preste a
                                        deletar o aluno{' '}
                                        <strong>{studentSelected.nome}</strong>
                                    </p>
                                    <GroupButton>
                                        <button
                                            type="button"
                                            title="Deletar aluno"
                                            onClick={() => {
                                                handlerDelete(
                                                    studentSelected.id
                                                );
                                            }}
                                        >
                                            OK!
                                        </button>
                                        <button
                                            type="button"
                                            title="Não deletar aluno"
                                            onClick={() => {
                                                setStudentSelected({});
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </GroupButton>
                                </ContainerAlert>
                            </ContainerOwner>
                        )}
                        {students.length > 0 ? (
                            <TableStudents>
                                <thead>
                                    <tr>
                                        <th>NOME</th>
                                        <th>E-MAIL</th>
                                        <th>IDADE</th>
                                        <th />
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(student => (
                                        <tr key={student.id}>
                                            <td>{student.nome}</td>
                                            <td>{student.email}</td>
                                            <td>{student.idade}</td>
                                            <td
                                                onClick={() =>
                                                    handlerUpdate(student.id)
                                                }
                                            >
                                                <span>editar</span>
                                            </td>
                                            <td
                                                className="active"
                                                onClick={() =>
                                                    setStudentSelected({
                                                        id: student.id,
                                                        nome: student.nome,
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
                            <strong>Parece que não há ninguém por aqui!</strong>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default Home;
