import axios from 'axios';
import { COURSES_URL } from '../utils/constants';

export const getCourses = () => axios.get(COURSES_URL)
  .then(res => res.data);
