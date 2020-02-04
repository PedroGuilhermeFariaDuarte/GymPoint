import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Textarea } from '@rocketseat/unform';
import { AiOutlineLoading } from 'react-icons/ai';

// Global components
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import BoxChat from '../../components/BoxChat';

// Services
import api from '../../services/api';

// Styles Global
import Container from '../../styles/global_container';
import { TableStudents } from '../../styles/global-table';
import { ContainerOwner } from '../../styles/container_owner';

// Styles
import { ListChat, HelperChat } from './styles';

function Help({ history }) {
    const [helps, setHelps] = useState([]);
    const [helpSelected, setHelpSelected] = useState({});
    const [loading, setLoading] = useState(false);
    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    useEffect(() => {
        async function loadHelps() {
            setLoading(true);
            try {
                const response = await api.get('/helpOrders/all', {
                    headers: {
                        authorization: token,
                    },
                });

                const helpsData = response.data;

                if (helpsData.code && helpsData.code === 6) {
                    setLoading(false);
                    toast.error(helpsData.message);
                }

                setHelps(helpsData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                toast.error(error.message);
            }
        }

        loadHelps();
    }, []);

    function handlerGetHelp(id) {
        setHelpSelected(helps.filter(i => i.id === id && i));
    }

    async function handlerAnswer(data) {
        try {
            const idHelp = helpSelected[0].id;
            const response = await api.put(
                `/helpOrders/${idHelp}/answer`,
                {
                    answer: data.response,
                    answer_at: new Date(),
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            const answerData = response.data;

            if (answerData.code && answerData.code === 6) {
                toast.error(answerData.message);
            }

            console.log(
                helps.filter(i => i.id !== idHelp && i),
                idHelp
            );

            setHelps(helps.filter(i => i.id !== idHelp && i));
            toast.success(
                `Aluno ${helpSelected[0].student_help.nome} respondido com sucesso`
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <Header />
            <Container>
                <SubHeader history={history} titlePage="Pedidos de auxílio" />
                {loading ? (
                    <AiOutlineLoading size={24} color="#ee4d64" />
                ) : helps.length > 0 ? (
                    <>
                        {helpSelected.length > 0 && (
                            <ContainerOwner>
                                <Form onSubmit={handlerAnswer}>
                                    <strong>PERGUNTA DO ALUNO</strong>
                                    <p>{helpSelected[0].question}</p>
                                    <strong>SUA RESPOSTA</strong>
                                    <Textarea
                                        name="response"
                                        placeholder="Digit aqui a sua respota"
                                    />
                                    <button type="submit">
                                        Responder aluno
                                    </button>
                                </Form>
                            </ContainerOwner>
                        )}

                        <TableStudents>
                            <thead>
                                <tr>
                                    <th>ALUNO</th>
                                    <th />
                                    <th />
                                    <th />
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {helps.map(help => (
                                    <tr key={help.id}>
                                        <td>{help.student_help.nome}</td>
                                        <td />
                                        <td />
                                        <td />
                                        <td
                                            onClick={() =>
                                                handlerGetHelp(help.id)
                                            }
                                        >
                                            <span>responder</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableStudents>
                    </>
                ) : (
                    <p>Nenhum auxílio disponivel!</p>
                )}
                <HelperChat>
                    <strong>8 </strong> alunos online
                </HelperChat>
                <ListChat>
                    <ul>
                        <li>
                            Pedro Guilherme <span></span>
                        </li>
                        <li>
                            Diego Fernandes <span></span>
                        </li>
                        <li>
                            Filipe Deschamps <span></span>
                        </li>
                    </ul>
                </ListChat>
                <BoxChat />
            </Container>
        </>
    );
}

export default Help;
