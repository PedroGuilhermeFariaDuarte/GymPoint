import produce from 'immer';

const INITIAL_STATE = {
    nome: null,
    email: null,
    idade: null,
    peso: null,
    altura: null,
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@Aluno/NOVO_CADASTRO':
            const data = action.payload;
            return { ...state, data };
        default:
            return state;
    }
}
