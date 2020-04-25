import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as types from '../common/action.type';
import lodash from 'lodash';
import { editMember } from '../action/action';

const initState = {
    members: [],
    projects: []
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case types.GET_MEMBERS:
            return lodash.assign({}, state, {members: action.getMembers})
        case types.CREATE_MEMBER:
            let newMember = [action.members];
            return lodash.assign({}, state, {members: state.members.concat(newMember)})
        case types.EDIT_MEMBER:
            let editMembers = state.members.map((value) => {
                console.log(action.editMembers)
                if(value._id === action.editMembers._id){
                    value.name = action.editMembers.name;
                    value.phone = action.editMembers.phone;
                    value.birthday = action.editMembers.birthday;
                }
                return value;
            })
            return lodash.assign({}, state, {members: editMembers})
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
