import axios from 'axios';
import { DEPARTMENTS_URL, COURSES_URL, TIMETABLE_URL } from '../utils/constants';

export const getDepartments = () => axios.get(DEPARTMENTS_URL)
  .then(res => res.data);

export const getCourses = department => axios.get(`${COURSES_URL}/${department}`)
  .then(res => res.data)
  .then(courses => courses.filter(course => !course.title.includes('(S)')));
  // TODO do filtering on the server

export const getTimetable = (department, courseId) =>
  axios.get(`${TIMETABLE_URL}/${department}/${courseId}`)
    .then(res => res.data);
