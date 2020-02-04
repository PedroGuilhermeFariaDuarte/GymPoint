import React, { useState, useEffect, useMemo } from 'react';
import InputMask from 'react-input-mask';
import { Form, Input } from '@rocketseat/unform';
import { useSelector } from 'react-redux';
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
import { formatPrice } from '../../utils/format';

function Plan({ history, location }) {
    const token = `Bearer ${useSelector(state => state.Auth.token)}`;

    const [plans, setPlans] = useState({});
    const [idPlan, setIdPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    function handlerIdPlan() {
        const params = parse(location.search);
        return params.id;
    }

    async function handlerUpdatePlan() {
        const data = plans;
        try {
            const response = await api.put(`/plans/${idPlan}/upplan`, data, {
                headers: {
                    authorization: token,
                },
            });

            const planUpdate = response.data;
            if (planUpdate.code && planUpdate.code === 6) {
                console.log(planUpdate);
                toast.error(planUpdate.message);
                return;
            }

            toast.success('Plano Atualizado com sucesso!');
        } catch (error) {
            console.tron.log(error);
            toast.error(error.message);
        }
    }

    async function handlerCreatePlan() {
        const data = plans;
        try {
            setLoading(true);
            const response = await api.post(`/plans`, data, {
                headers: {
                    authorization: token,
                },
            });

            const planUpdate = response.data;
            if (planUpdate.code && planUpdate.code === 6) {
                console.log(planUpdate);
                toast.error(planUpdate.message);
                return;
            }

            toast.success('Plano cadastrado com sucesso!');
        } catch (error) {
            console.tron.log(error);
            toast.error(error.message);
        }
    }

    async function handlerLoadPlan() {
        try {
            setLoading(true);
            const response = await api.get(`/plans/${idPlan}/myplan`, {
                headers: {
                    authorization: token,
                },
            });

            const plantData = response.data;
            if (plantData.code && plantData.code === 6) {
                toast.error(plantData.message);
                setLoading(false);
                return;
            }

            plantData.totalPrice = formatPrice(
                plantData.price * plantData.duration
            );

            plantData.priceOriginal = plantData.price;

            setPlans({
                ...plantData,
            });
            setLoading(false);
        } catch (error) {
            toast.error('Não foi possivel recuperar os dados do plano!');
        }
    }

    async function handlerSubmit() {
        try {
            if (idPlan) {
                await handlerUpdatePlan();
                return;
            }

            return await handlerCreatePlan();
        } catch (error) {
            toast.error('Naõ foi possivel cadastrar o plano');
        }
    }

    useEffect(() => {
        setIdPlan(handlerIdPlan());
    }, []);

    useMemo(async () => {
        if (idPlan) {
            await handlerLoadPlan(idPlan);
        }
    }, [idPlan]);

    return (
        <>
            <Header />
            <Container>
                <SubHeader
                    history={history}
                    titlePage={idPlan ? 'Edição de plano' : 'Cadastro de plano'}
                    nextPageName="VOLTAR"
                    nextPageRoute="plan"
                    callBackPage
                />
                <FormContainer>
                    <Form initialData={plans} onSubmit={handlerSubmit}>
                        <label>TÍTULO DO PLANO</label>
                        <Input
                            type="text"
                            name="title"
                            onChange={e => {
                                setPlans({
                                    ...plans,
                                    title: e.target.value,
                                });
                            }}
                        />

                        <GroupOfInput>
                            <Group>
                                <label>DURAÇÃO (em meses)</label>
                                <InputMask
                                    type="text"
                                    name="duration"
                                    mask="99"
                                    onChange={e => {
                                        setPlans({
                                            ...plans,
                                            duration: e.target.value
                                                .replace('_', '')
                                                .trim(),
                                        });
                                    }}
                                    placeholder={plans.duration}
                                    defaultValue={plans.duration}
                                />
                            </Group>
                            <Group>
                                <label>PREÇO MENSAL</label>
                                <Input
                                    type="text"
                                    name="price"
                                    placeholder={formatPrice(80.9)}
                                    onChange={e => {
                                        setPlans({
                                            ...plans,
                                            priceOriginal: e.target.value,
                                            price: e.target.value,
                                        });
                                    }}
                                />
                            </Group>
                            <Group>
                                <label>PREÇO TOTAL</label>
                                <Input
                                    disabled
                                    type="text"
                                    name="totalPrice"
                                    value={formatPrice(
                                        plans.priceOriginal * plans.duration
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

export default Plan;
