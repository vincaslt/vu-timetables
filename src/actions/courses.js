import { getCourses } from '../api/timetable';

export const REQUEST_COURSES = 'REQUEST_COURSES';
export const RECEIVE_COURSES = 'RECEIVE_COURSES';

const requestCourses = () => ({ type: REQUEST_COURSES, loading: true });
const receiveCourses = (courses) => ({
  type: RECEIVE_COURSES,
  loading: false,
  courses,
});

export function fetchCourses(department) {
  return dispatch => {
    dispatch(requestCourses());
    getCourses(department)
      .then(courses => dispatch(
        receiveCourses(courses)
      ))
      .catch(console.log); // TODO handle somehow
  };
}
