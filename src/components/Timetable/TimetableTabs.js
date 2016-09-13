import React, { PropTypes } from 'react';
import { Tabs, Tab, Content, MDLComponent } from 'react-mdl';

const mapByDay = (timetable) => {
  const mappedByDay = {};
  timetable.forEach(lecture => {
    const day = lecture.time.day;
    mappedByDay[day] = mappedByDay[day] || [];
    mappedByDay[day].push(lecture);
  });
  return mappedByDay;
};

const TimetableTabs = ({ timetable, activeTab = 0, activateTimetableTab }) => {
  const mappedByDay = mapByDay(timetable);

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
      <Content>
        <div>Content for the tab: {activeTab}</div>
      </Content>
    </div>
  );
};

TimetableTabs.propTypes = {
  timetable: PropTypes.arrayOf(PropTypes.object).isRequired,
  activateTimetableTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
};

export default TimetableTabs;
