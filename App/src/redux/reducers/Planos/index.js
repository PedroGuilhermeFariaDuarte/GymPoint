import produce from 'immer';

const INITIAL_STATE = {};

export default function Planos(state = INITIAL_STATE, action) {
    console.tron.log(action);

    return produce(state, draft => {
        switch (action.type) {
            case '@plano/PLANO_SELECIONADO':
                draft.value = action.payload.value;
                draft.label = action.payload.label;
                draft.color = action.payload.color;
                draft.duration = action.payload.duration;
                draft.price = action.payload.price;
                break;
            default:
        }
    });
}
