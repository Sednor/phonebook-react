import actionTypes from '../actions/actionTypes';

const TEST_DATA = [];
for (let i = 0; i < 100; i++) {
    TEST_DATA.push({
        id: Math.random(),
        name: Math.random(),
        phoneNumber: Math.random(),
        email: Math.random()
    });
}

const INITIAL_STATE = { contacts: [] }; // Use TEST_DATA to render 100 randomly generated contacts

export default function contacts(state = INITIAL_STATE, action) {
    let contacts = state.contacts.slice();

    switch (action.type) {
        case actionTypes.ADD_CONTACT:
            contacts.push(action.data);
            return { ...state, contacts };
        case actionTypes.REMOVE_CONTACT:
            const CONTACTS = contacts.filter(item => item.id !== action.id);

            return { ...state, contacts: CONTACTS };
        default:
            return state;
    }
}