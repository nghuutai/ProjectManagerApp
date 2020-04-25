import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as types from '../common/action.type';
import lodash from 'lodash';

const initState = {
    members: [
        {
            id: 1,
            name: 'huu tai',
            phone: '0983748388',
            birthday: '2020-04-22'
        },
        {
            id: 2,
            name: 'huu tai 1',
            phone: '0983748566',
            birthday: '2020-05-21'
        }
    ],
    projects: []
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case types.CREATE_MEMBER:
            return lodash.assign({}, state, {members: action.members})
        case types.EDIT_MEMBER:
            return lodash.assign({}, state, {members: action.editMembers})
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
