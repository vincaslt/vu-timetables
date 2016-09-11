import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import DepartmentsPage from './containers/DepartmentsPage';
import CoursesPage from './containers/CoursesPage';
import TimetablePage from './containers/TimetablePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DepartmentsPage} />
    <Route path="/:dept" component={CoursesPage} />
    <Route path="/:dept/:course" component={TimetablePage} />
  </Route>
);
