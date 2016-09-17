import React, { PropTypes } from 'react';
import { Tabs, Tab, MDLComponent } from 'react-mdl';
import TimetableContent from './TimetableContent';

const mapByDay = (lectures) => {
  const mappedByDay = {};
  lectures.forEach(lecture => {
    const day = lecture.time.day;
    mappedByDay[day] = mappedByDay[day] || [];
    mappedByDay[day].push(lecture);
  });
  return mappedByDay;
};

const TimetableTabs = (
  {
    lectures,
    activeTab = 0,
    activateTimetableTab,
    group = null,
    optionalLectures = [],
  }) => {
  const mappedByDay = mapByDay(lectures);
  const lecturesByDay = Object.values(mappedByDay);

  const tabs = Object.keys(mappedByDay).map((day, index) => (
    <Tab key={index}>{day}</Tab>
  ));

  return (
    <div>
      <MDLComponent>
        <Tabs
          activeTab={activeTab}
          onChange={tabId => activateTimetableTab(tabId)}
          ripple
        >
          {tabs}
        </Tabs>
      </MDLComponent>
      <TimetableContent
        timetableForOneDay={lecturesByDay[activeTab]}
        group={group}
        optionalLectures={optionalLectures}
      />
    </div>
  );
};

TimetableTabs.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.object).isRequired,
  activateTimetableTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
  group: PropTypes.number,
  optionalLectures: PropTypes.arrayOf(PropTypes.string)
};

export default TimetableTabs;
