import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import contacts from './contacts';

const Project = combineReducers({
    contacts,
    routing
});

export default Project;