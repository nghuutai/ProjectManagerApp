import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as types from '../common/action.type';
import lodash from 'lodash';


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
                if(value._id === action.editMembers._id){
                    value.name = action.editMembers.name;
                    value.phone = action.editMembers.phone;
                    value.birthday = action.editMembers.birthday;
                }
                return value;
            })
            return lodash.assign({}, state, {members: editMembers})
        case types.GET_PROJECT:
            return lodash.assign({}, state, {projects: action.getProjects})
        case types.CREATE_PROJECT:
            let newProject = [action.newProject]
            return lodash.assign({}, state, {projects: state.projects.concat(newProject)})
        case types.EDIT_PROJECT:
            let editProjects = state.projects.map((value) => {
                if(value._id === action.editProject._id){
                    value.name = action.editProject.name;
                    value.description = action.editProject.description;
                }
                return value;
            })
            return lodash.assign({}, state, {projects: editProjects})
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
