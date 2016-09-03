var restify = require('restify');
var Promise = require('bluebird');
var xray = require('x-ray');

var x = xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    index: function (url) {
      parts = url.split('/');
      return Number(parts[parts.length - 2]);
    }
  }
});

var COURSES_URL = 'https://mif.vu.lt/timetable/mif/';


var server = restify.createServer({
  name: 'mif-timetables',
  version: '1.0.0'
});

server.use(restify.CORS({
  // Defaults to ['*'].
  //origins: ['http://stonyvin.net'],
  credentials: true
}));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var getCourses = Promise.promisify(
  x(COURSES_URL, '.col-sm-12', [{
    title: 'a@html | trim',
    id: 'a@href | index'
  }])
);

server.get('/api/courses', function (req, res, next) {
  getCourses().then(function (courses) {
    res.send(courses);
  });
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
