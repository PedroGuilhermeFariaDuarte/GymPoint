import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

// Actions redux
import * as PlanoActions from '../../redux/reducers/Planos/action';

// Services
import api from '../../services/api';

function Select({ token }) {
    // Dados dos planos disponivei para a matricula
    const [plansOptions, setPlansOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    /**
     * Carrega todos os planos disponivel na base de dados, em caso de sucesso na busca pelos planos  os mesmos serão
     * armazenados no state<Array> do componente
     */
    async function handlerLoadPlans() {
        try {
            const response = await api.get(`/plans/list`, {
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

            const options = plantData.map(plan => ({
                value: plan.id,
                label: plan.title,
                color: '#EE4D64',
                duration: plan.duration,
                price: plan.price,
            }));

            setPlansOptions(options);
        } catch (error) {
            console.log(error);
            toast.error('Não foi possivel recuperar o "Plano" da matricula!');
        }
    }

    /**
     * @param {AsyncSelect} inputValue recebe o option selecionado pelo
     * usuario
     */
    async function handlerOnChangeOptionPlan(inputValue) {
        // Salva no state global o option selecionado pelo usuario
        dispatch(PlanoActions.setPlano(inputValue));
    }

    /**
     *
     * @param {*} inputValue recebe um string
     * @param {*} callback recebe uma promoisse e retorna um callback
     */
    function loadOptions(inputValue, callback) {
        callback(handlerPlans(inputValue));
    }

    /**
     *
     * @param {*} inputValue lista todos os options do select
     */
    function handlerPlans(inputValue) {
        setTimeout(() => {
            console.log(plansOptions);
            return plansOptions;
        }, 2000);
    }

    useEffect(() => {
        async function loadPlans() {
            await handlerLoadPlans();
        }

        loadPlans();
    }, []);

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions={plansOptions}
            onChange={handlerOnChangeOptionPlan}
            name="plano"
            id="select"
        />
    );
}

export default Select;
