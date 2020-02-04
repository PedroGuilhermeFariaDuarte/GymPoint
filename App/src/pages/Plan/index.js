import React, { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

// Utils
import { formatPrice } from '../../utils/format';

function Plan({ history }) {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [planSelected, setPlantSelected] = useState({});
    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    function handlerUpdate(id) {
        history.push(`/myplans?id=${id}`);
    }

    async function handlerDelete(id) {
        try {
            setLoading(true);
            const response = await api.delete(`/plans/${id}/delplan`, {
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
            toast.success('Plano deletado com sucesso!');
            setPlans(plans.filter(i => i.id !== id));
            setPlantSelected({});
        } catch (error) {
            toast.error(
                'Me desculpe!, houve um erro critico. Tente novamente mais tarde'
            );
        }
    }

    useEffect(() => {
        async function loadPlans() {
            try {
                setLoading(true);
                const response = await api.get('/plans/list', {
                    headers: {
                        authorization: token,
                    },
                });
                const plansData = response.data;

                if (plansData.code && plansData.code === 6) {
                    setLoading(false);
                    toast.error(plansData.message);
                    return;
                }
                setLoading(false);
                setPlans(plansData);
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }
        loadPlans();
    }, []);
    return (
        <>
            <Header />
            <Container>
                <SubHeader
                    history={history}
                    titlePage="Gerenciando Planos"
                    nextPageName="CADASTRAR"
                    nextPageRoute="myplans"
                    disabledInputSearch={true}
                />
                {loading ? (
                    <AiOutlineLoading size={24} color="#ee4d64" />
                ) : plans.length > 0 ? (
                    <>
                        {planSelected.id && (
                            <ContainerOwner>
                                <ContainerAlert>
                                    <AlertHeader>
                                        <strong>Alerta do sistema!</strong>
                                    </AlertHeader>
                                    <p>
                                        Administrador!, você está preste a
                                        deletar o plano{' '}
                                        <strong>{planSelected.nome}</strong>
                                    </p>
                                    <GroupButton>
                                        <button
                                            type="button"
                                            title="Deletar aluno"
                                            onClick={() => {
                                                handlerDelete(planSelected.id);
                                            }}
                                        >
                                            OK!
                                        </button>
                                        <button
                                            type="button"
                                            title="Não deletar plano"
                                            onClick={() => {
                                                setPlantSelected({});
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </GroupButton>
                                </ContainerAlert>
                            </ContainerOwner>
                        )}
                        <TableStudents>
                            <thead>
                                <tr>
                                    <th>TÌTULO</th>
                                    <th />
                                    <th />
                                    <th>DURAÇÃO</th>
                                    <th>VALOR p/MÊS</th>
                                    <th />
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map(plan => (
                                    <tr key={plan.id}>
                                        <td>{plan.title}</td>
                                        <td />
                                        <td />
                                        <td>{plan.duration} mêses</td>
                                        <td>{formatPrice(plan.price)}</td>
                                        <td
                                            onClick={() => {
                                                handlerUpdate(plan.id);
                                            }}
                                        >
                                            <span>editar</span>
                                        </td>
                                        <td
                                            className="active"
                                            onClick={() =>
                                                setPlantSelected({
                                                    id: plan.id,
                                                    nome: plan.title,
                                                })
                                            }
                                        >
                                            <span>apagar</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableStudents>
                    </>
                ) : (
                    <>
                        <strong>Nenhum plano disponivel!</strong>
                    </>
                )}
            </Container>
        </>
    );
}

export default Plan;
