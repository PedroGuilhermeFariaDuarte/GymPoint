import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    email: null,
    nome: null,
};
export default function Auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS':
                draft.token = action.payload.token;
                draft.email = action.payload.email;
                draft.nome = action.payload.nome;
                break;
            case '@auth/SIGN_OUT':
                draft.token = null;
                break;

            default:
        }
    });
}
