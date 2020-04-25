import * as types from '../common/action.type';
import Axios from 'axios';
import URL from '../common/config';
import * as route from '../common/app.route';

export const createMember = (member) => {
    console.log(member);
    return function(dispatch) {
        Axios.post(URL + route.MEMBER, member)
            .then(function (reponse) {
                let newMember = {
                    name: reponse.data.data.name,
                    phone: reponse.data.data.phone,
                    birthday: reponse.data.data.birthday.slice(0,10)
                }
                dispatch({ type: types.CREATE_MEMBER, members: newMember})
            })
    }
}

export const editMember = (editMember, id) => {
    console.log(editMember);
    return function(dispatch) {
        Axios.put(URL + route.MEMBER + '/' + id, editMember)
            .then(function(response) {
                dispatch({ type: types.EDIT_MEMBER, editMembers: response.data.data})
            })
    }
}

export const getMembers = () => {
    return function(dispatch) {
        Axios.get(URL + route.MEMBER)
            .then(function (response) {
                let listMember = response.data.data.map((value) => {
                    value.birthday = value.birthday.slice(0,10);
                    return value;
                })
                dispatch({ type: types.GET_MEMBERS, getMembers: listMember })
            })
    }
}

export const createProject = (project) => {
    return function(dispatch) {
        Axios.post(URL + route.PROJECT, project)
            .then(function(response) {
                dispatch({ type: types.CREATE_PROJECT, newProject: response.data.data})
            })
    }
}

export const editProject = (project, id) => {
    return function(dispatch) {
        Axios.put(URL + route.PROJECT + "/" + id, project)
            .then(function(response) {
                dispatch({ type: types.EDIT_PROJECT, editProject: response.data.data})
            })
    }
}

export const getProjects = () => {
    return function(dispatch) {
        Axios.get(URL + route.PROJECT)
            .then(function (response) {
                console.log(response.data.data);
                dispatch({ type: types.GET_PROJECT, getProjects: response.data.data })
            })
    }
}