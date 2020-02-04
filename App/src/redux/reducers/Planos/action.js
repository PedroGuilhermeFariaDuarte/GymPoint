export function setPlanoRequest(data) {
    return {
        type: '@plano/PLANO_SELECIONADO_REQUEST',
        payload: data,
    };
}

export function setPlano(data) {
    return {
        type: '@plano/PLANO_SELECIONADO',
        payload: data,
    };
}
