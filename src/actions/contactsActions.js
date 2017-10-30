import actionTypes from './actionTypes';

export function addContact(data) {
    return { type: actionTypes.ADD_CONTACT, data };
}

export function removeContact(id) {
    return { type: actionTypes.REMOVE_CONTACT, id }
}