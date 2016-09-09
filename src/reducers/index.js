import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import departments from './departments';
import courses from './courses';
import timetable from './timetable';

const rootReducer = combineReducers({
  departments,
  courses,
  timetable,
  routing,
});

export default rootReducer;
