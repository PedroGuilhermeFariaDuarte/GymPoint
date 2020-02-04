import { combineReducers } from 'redux';

// Reducers
import Auth from '../reducers/Auth';
import Aluno from '../reducers/Aluno';
import Planos from '../reducers/Planos';

export default combineReducers({ Auth, Aluno, Planos });
