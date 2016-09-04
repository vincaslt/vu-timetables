var restify = require('restify');
var Promise = require('bluebird');
var xray = require('x-ray');
var entities = require("entities");
require('es6-shim');

var p = Promise.promisify;

var x = xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    index: function (url) {
      parts = url.split('/');
      return Number(parts[parts.length - 2]);
    },
    decode: function (value) {
      return entities.decodeHTML(value);
    }
  }
});

function promiseWhile(predicate, action, value) {
  return Promise.resolve(value)
    .then(predicate)
    .then(function(condition) {
      if (condition)
        return promiseWhile(predicate, action, action());
    });
}

var COURSES_URL = 'https://mif.vu.lt/timetable/';
var LECTURES_URL = '/courses/';


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

var getCourses = function(department) {
  return p(x(COURSES_URL + department + '/', '.col-sm-12', [{
    title: 'a@html | trim | decode',
    id: 'a@href | index | decode'
  }]))();
}

function getTimetable(department, courseId) {
  var parseTable = p(x(COURSES_URL + department + LECTURES_URL + courseId + '/',
    ['tr@html | trim | decode'])
  );

  var isMainHeading = function (row) {
    return p(x(row, 'th@colspan'))()
      .then(function (colspan) {
        return colspan > 1;
      });
  }

  var getWeekday = function (row) {
    return isMainHeading(row)
      .then(function(isMain) {
        return isMain ? p(x(row, 'th | trim | decode'))() : null;
      });
  }

  var getTime = function(formattedTime) {
    time = formattedTime.split(':');
    return {
      hour: time[0],
      minutes: time[1]
    };
  }

  var parseLectures = function(tagValues, currentDay, evenWeek, group) {
    if (!tagValues || tagValues.length < 7) {
      return [];
    }

    var subgroups = null;
    if (tagValues[5].startsWith('Pogrupiai:')) {
      subgroups = tagValues
        .splice(5, 1)[0]
        .slice(11)
        .split(',')
        .map(function (subgroup) {
          return subgroup.split('').join('.');
        });
    }

    var formattedTimes = tagValues[0].split(' - ');

    var lectureModel = {
      title: tagValues[3],
      time: {
        day: currentDay,
        start: getTime(formattedTimes[0]),
        end: getTime(formattedTimes[1]),
        odd: tagValues[2].startsWith('Kiekvien') || !evenWeek,
        even: tagValues[2].startsWith('Kiekvien') || evenWeek
      },
      group: group,
      subgroups: subgroups,
      type: tagValues[4],
      lector: tagValues[5],
      auditorium: tagValues[6]
    };

    if (!tagValues[2].startsWith('Kiekvien')) {
      evenWeek = !evenWeek;
    }

    return [lectureModel].concat(parseLectures(
      tagValues.slice(7),
      currentDay,
      evenWeek,
      group
    ));
  }

  var getLecuresInRow = function (row, currentDay) {
    return p(x(row, ['td | trim | decode']))()
      .then(function (columns) {
        var group = 0;
        var lectures = [];
        columns.forEach(function(column) {
          group++;
          var tagValues = column.split(/[\n]+/)
            .map(function (str) {
              return str.trim();
            })
            .filter(Boolean);
          lectures = lectures.concat(
            parseLectures(tagValues, currentDay, true, group)
          );
        });
        return lectures;
      });
  }

  var parseTimetable = function(rows, index, lectures, currentDay) {
    if (rows[index] === undefined) {
      return lectures;
    }

    return getWeekday(rows[index])
      .then(function (day) {
        currentDay = day || currentDay;
        return getLecuresInRow(rows[index], currentDay);
      })
      .then(function (lecturesInRow) {
        lectures = lectures.concat(lecturesInRow);
        return parseTimetable(rows, index + 1, lectures, currentDay);
      });
  }

  return parseTable().then(function (tableRows) {
    return parseTimetable(tableRows, 0, [], '');
  });
}

server.get('/api/courses/:dept', function (req, res, next) {
  getCourses(req.params.dept).then(function (courses) {
    res.json(courses, {'content-type': 'application/json; charset=utf-8'});
  })
  return next();
});

server.get('/api/timetable/:dept/:courseId', function (req, res, next) {
  getTimetable(req.params.dept, req.params.courseId).then(function (timetable) {
    res.json(timetable, {'content-type': 'application/json; charset=utf-8'});
  });
  return next();
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function () {
  console.log('\n%s listening at %s', server.name, server.url);
});
