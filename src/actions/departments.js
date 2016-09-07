import { getDepartments } from '../api/timetable';

export const REQUEST_DEPARTMENTS = 'REQUEST_DEPARTMENTS';
export const RECEIVE_DEPARTMENTS = 'RECEIVE_DEPARTMENTS';

const requestDepartments = () => ({ type: REQUEST_DEPARTMENTS, loading: true });
const receiveDepartments = (departments) => ({
  type: RECEIVE_DEPARTMENTS,
  loading: false,
  departments,
});

export function fetchDepartments() {
  return dispatch => {
    dispatch(requestDepartments());
    getDepartments()
      .then(departments => dispatch(
        receiveDepartments(departments)
      ))
      .catch(console.log); // TODO handle somehow
  };
}
