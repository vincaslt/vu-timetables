import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import departments from './departments';

const rootReducer = combineReducers({
  departments,
  routing,
});

export default rootReducer;
