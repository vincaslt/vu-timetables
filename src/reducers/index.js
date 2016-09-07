import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import departments from './departments';
import courses from './courses';

const rootReducer = combineReducers({
  departments,
  courses,
  routing,
});

export default rootReducer;
