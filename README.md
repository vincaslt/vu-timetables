### Introduction

This year's VU timetable website is atrocious, and not user-friendly in any way. The aim of this project is to provide with a better-looking timetable which would be universal across all VU departments and courses.

Current timetable: https://mif.vu.lt/timetable/

### Should be possible to:

- [x] Select your course
- [x] Select your subject
- [x] Have a timetable parsed according to data
- [x] Provide with a shareable URL
- [x] Filter by group
- [x] Filter by optional subject
- [ ] Filter by subgroup
- [ ] Have the timetable be represented in a nicer way than current VU timetable
- [ ] Seamlessly use the app

### API

The API is already functional and running on https://timetables.stonyvin.net/api/


It returns arrays of [JSON](https://en.wikipedia.org/wiki/JSON) objects. The endpoints are following:
* `/departments` - array of department objects of departments at Vilnius University
* `/courses/{departmentId}` - array of course objects of courses available at the department. Example: `https://timetables.stonyvin.net/api/courses/gmf`
* `/timetable/{departmentId}/{courseId}` - array of lecture objects. Example: `https://timetables.stonyvin.net/api/timetable/mif/33`

Note: the api is still a work-in-progress, and while it's unlikely that endpoints will change, data structure might.

### Application

There is a preview of the application here: http://timetables.stonyvin.net

This is only a preview version, so there is some functionality missing yet. Filters can be applied
by adding url query parameters, like so: `http://timetables.stonyvin.net/#/mif/33?group=3&opt=skaitiniai-metodai&opt=loginis-programavimas`

Application can be build from source with: `npm start`

### Notable Technologies Used
* [ES6 with Babel](https://babeljs.io) (Next-gen JavaScript)
* [React](https://facebook.github.io/react/) (View layer)
* [Redux](https://github.com/reactjs/redux) (React state management)
* [redux-thunk](https://github.com/gaearon/redux-thunk) (Simpler async redux actions)
* [SASS](http://sass-lang.com) (Styles)
* [Webpack](https://webpack.github.io) (Module bundling)
* [Node.js](https://nodejs.org/en/) (Server stack)
* [Restify](http://restify.com) (REST server)
* [X-Ray](https://github.com/lapwinglabs/x-ray) (HTML parsing)
* [react-mdl](https://github.com/tleunen/react-mdl) (Google Material)
