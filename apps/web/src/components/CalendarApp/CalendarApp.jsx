import React, { useState, useEffect, useRef } from 'react';
import './app.css';

const CalendarApp = () => {
    const calendarRef = useRef(null);
  const darkModeToggleRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());

  useEffect(() => {
    console.log('Dark mode state:', darkMode);
    const backgroundContainer = document.getElementById('background-container');
  if (backgroundContainer) {
    backgroundContainer.classList.toggle('light', !darkMode);
    backgroundContainer.classList.toggle('dark', darkMode);
  }
  }, [darkMode]);
  
  useEffect(() => {
    generateCalendar(currMonth, currYear);
  }, [currMonth, currYear]);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const generateCalendar = (month, year) => {
    const calendar = calendarRef.current;
    const calendar_days = calendar.querySelector('.calendar-days');
    const calendar_header_year = calendar.querySelector('#year');
    const month_picker = calendar.querySelector('#month-picker');

    const days_of_month = [
      31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    calendar_days.innerHTML = '';

    let currDate = new Date();
    if (month === undefined) month = currDate.getMonth();
    if (year === undefined) year = currDate.getFullYear();

    let curr_month = `${month_names[month]}`;
    month_picker.innerHTML = curr_month;
    calendar_header_year.innerHTML = year;

    // get first day of month
    let first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement('div');
      if (i >= first_day.getDay()) {
        day.classList.add('calendar-day-hover');
        day.innerHTML = i - first_day.getDay() + 1;
        day.innerHTML += `<span></span>
                          <span></span>
                          <span></span>
                          <span></span>`;
        if (
          i - first_day.getDay() + 1 === currDate.getDate() &&
          year === currDate.getFullYear() &&
          month === currDate.getMonth()
        ) {
          day.classList.add('curr-date');
        }
        calendar_days.appendChild(day);
      }
    }
  };

  const month_names = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month_picker = calendarRef.current && calendarRef.current.querySelector('#month-picker');
  const month_list = calendarRef.current && calendarRef.current.querySelector('.month-list');
  const dark_mode_toggle = darkModeToggleRef.current;

  useEffect(() => {
    if (dark_mode_toggle) {
      dark_mode_toggle.onclick = () => {
        console.log('Dark mode toggled');
        setDarkMode((prevDarkMode) => !prevDarkMode);
      };
    }
  }, [dark_mode_toggle]);


  return (
    <div id="background-container" className={darkMode ? 'dark' : 'light'}>
      <div ref={calendarRef} className="calendar">
        <div className="calendar-header">
          <span className="month-picker" id="month-picker">February</span>
          <div className="year-picker">
            <span className="year-change" id="prev-year" onClick={() => setCurrYear(currYear - 1)}>
              <pre></pre>
            </span>
            <span id="year">2021</span>
            <span className="year-change" id="next-year" onClick={() => setCurrYear(currYear + 1)}>
              <pre></pre>
            </span>
          </div>
        </div>
        <div className="calendar-body">
          <div className="calendar-week-day">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-days"></div>
        </div>
        <div className="calendar-footer">
          <div className="toggle">
            <span>Dark Mode</span>
            <div ref={darkModeToggleRef} className="dark-mode-switch">
              <div className="dark-mode-switch-ident"></div>
            </div>
          </div>
        </div>
        <div className="month-list"></div>
      </div>
    </div>
  );
};

export default CalendarApp;
