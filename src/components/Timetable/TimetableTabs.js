import React, { PropTypes } from 'react';
import { Tabs, Tab, MDLComponent } from 'react-mdl';
import TimetableContent from './TimetableContent';

const mapByDay = (timetable) => {
  const mappedByDay = {};
  timetable.forEach(lecture => {
    const day = lecture.time.day;
    mappedByDay[day] = mappedByDay[day] || [];
    mappedByDay[day].push(lecture);
  });
  return mappedByDay;
};

const TimetableTabs = ({ timetable, activeTab = 0, activateTimetableTab, group = null }) => {
  const mappedByDay = mapByDay(timetable);
  const lessonsByDay = Object.values(mappedByDay);

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
      <TimetableContent timetableForOneDay={lessonsByDay[activeTab]} group={group} />
    </div>
  );
};

TimetableTabs.propTypes = {
  timetable: PropTypes.arrayOf(PropTypes.object).isRequired,
  activateTimetableTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
  group: PropTypes.number,
};

export default TimetableTabs;
