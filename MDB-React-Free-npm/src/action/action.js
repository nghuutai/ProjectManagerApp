import * as types from '../common/action.type';

export const createMember = (member) => {
    console.log(member);
    return function(dispatch) {
        dispatch({ type: types.CREATE_MEMBER, members: member})
    }
}

export const editMember = (editMember) => {
    console.log(editMember);
    return function(dispatch) {
        dispatch({ type: types.EDIT_MEMBER, editMembers: editMember})
    }
}