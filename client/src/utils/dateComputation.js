const dateComp = {
  getEarliestAvailableDate(calendarUTCDates) {
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0, 0),
    );
    if (calendarUTCDates.length > 0) {
      for (let i = 0; i < calendarUTCDates.length; i += 1) {
        const currentUTCDateData = calendarUTCDates[i];
        const currentUTCDate = new Date(currentUTCDateData.date);
        const dateIsAvailable = !currentUTCDateData.isBooked;
        if (currentUTCDate > todayUTC && dateIsAvailable) {
          return currentUTCDate;
        }
      }
    }
    return null;
  },

  getMonthUTCDates(nextMonth, calendarUTCDates) {
    let firstOfMonthPosition;
    let lastOfMonthPosition;
    if (calendarUTCDates.length > 0) {
      for (let i = 0; i < calendarUTCDates.length; i += 1) {
        const currentUTCDateData = calendarUTCDates[i];
        const currentUTCDate = new Date(currentUTCDateData.date);
        const nextUTCDate = new Date(currentUTCDate);
        nextUTCDate.setDate(nextUTCDate.getDate() + 1);
        if (nextMonth.getFullYear() === currentUTCDate.getFullYear()
          && nextMonth.getMonth() === currentUTCDate.getMonth()) {
          if (currentUTCDate.getDate() === 1) {
            firstOfMonthPosition = i;
          } else if (currentUTCDate.getMonth() !== nextUTCDate.getMonth()) {
            lastOfMonthPosition = i;
            break;
          }
        }
      }
      return calendarUTCDates.slice(firstOfMonthPosition, lastOfMonthPosition + 1);
    }
    return null;
  },

  getMonthUTCDatesWithStatus(nextMonth, calendarUTCDates, checkInDate, checkOutDate) {
    const monthUTCDatesWithStatus = [];
    let isInCurrentMonth = false;
    if (calendarUTCDates.length > 0) {
      for (let i = 0; i < calendarUTCDates.length; i += 1) {
        let currentUTCDateData = calendarUTCDates[i];
        const currentUTCDate = new Date(currentUTCDateData.date);
        const nextUTCDate = new Date(currentUTCDate);
        nextUTCDate.setDate(nextUTCDate.getDate() + 1);
        if (!isInCurrentMonth
          && nextMonth.getFullYear() === currentUTCDate.getFullYear()
          && nextMonth.getMonth() === currentUTCDate.getMonth()) {
          isInCurrentMonth = true;
        }
        if (isInCurrentMonth) {
          currentUTCDateData = this.addStatus(currentUTCDateData, checkInDate, checkOutDate);
          monthUTCDatesWithStatus.push(currentUTCDateData);
          if (currentUTCDate.getMonth() !== nextUTCDate.getMonth()) {
            break;
          }
        }
      }
      return monthUTCDatesWithStatus;
    }
    return null;
  },

  addStatus(currentUTCDateData, checkInDate, checkOutDate) {
    const currentUTCDate = new Date(currentUTCDateData.date);
    const currentUTCDateDataWithStatus = {};
    Object.assign(currentUTCDateDataWithStatus, currentUTCDateData);
    const checkInDateDetail = this.getDateDetail(checkInDate);
    const checkOutDateDetail = this.getDateDetail(checkOutDate);
    if (this.checkDateMatch(currentUTCDate, checkInDateDetail) && checkOutDate.length >= 8) {
      currentUTCDateDataWithStatus.status = 'checkInDateWithDateRange';
    } else if (this.checkDateMatch(currentUTCDate, checkInDateDetail)) {
      currentUTCDateDataWithStatus.status = 'checkInDateOnly';
    } else if (this.checkDateMatch(currentUTCDate, checkOutDateDetail)) {
      currentUTCDateDataWithStatus.status = 'checkOutDate';
    } else if (this.checkDateRange(currentUTCDate, checkInDateDetail, checkOutDateDetail)) {
      currentUTCDateDataWithStatus.status = 'inBetweenDate';
    } else {
      currentUTCDateDataWithStatus.status = '';
    }
    return currentUTCDateDataWithStatus;
  },

  getDateDetail(limitedDateString) {
    if (limitedDateString.length >= 8) {
      const dateDetail = {
        year: limitedDateString.match(/\d+\/\d+\/(\d+)/)[1],
        month: limitedDateString.match(/(\d+)\/\d+\/\d+/)[1],
        day: limitedDateString.match(/\d+\/(\d+)\/\d+/)[1],
      };
      return dateDetail;
    }
    return { year: '1', month: '1', day: '1' };
  },

  checkDateMatch(currentUTCDate, dateDetail) {
    const year = currentUTCDate.getFullYear().toString() === dateDetail.year;
    const month = (currentUTCDate.getMonth() + 1).toString() === dateDetail.month;
    const day = currentUTCDate.getDate().toString() === dateDetail.day;
    return year && month && day;
  },

  checkDateRange(currentUTCDate, checkInDateDetail, checkOutDateDetail) {
    const currentYear = currentUTCDate.getFullYear();
    const currentMonth = currentUTCDate.getMonth() + 1;
    const currentDay = currentUTCDate.getDate();
    const year = currentYear >= Number(checkInDateDetail.year)
      && currentYear <= Number(checkOutDateDetail.year);
    const month = currentMonth >= Number(checkInDateDetail.month)
      && currentMonth <= Number(checkOutDateDetail.month);
    const day = currentDay > Number(checkInDateDetail.day)
      && currentDay < Number(checkOutDateDetail.day);
    return year && month && day;
  },

  getWeeksAndDays(monthUTCDates) {
    const firstDayOfMonth = new Date(monthUTCDates[0].date);
    const weekdayNumber = this.getWeekdayNumber(firstDayOfMonth);
    const weeksAndDays = [];
    let currentWeek = [];
    for (let i = 0; i < weekdayNumber; i += 1) {
      currentWeek.push('');
    }
    for (let i = 0; i < monthUTCDates.length; i += 1) {
      currentWeek.push(monthUTCDates[i]);
      if (currentWeek.length === 7) {
        weeksAndDays.push(currentWeek);
        currentWeek = [];
      } else if (i === monthUTCDates.length - 1) {
        while (currentWeek.length < 7) {
          currentWeek.push('');
        }
        weeksAndDays.push(currentWeek);
      }
    }
    return weeksAndDays;
  },

  getWeekdayNumber(monthDate) {
    const day = monthDate.toLocaleString('en-US', { weekday: 'short' });
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayNumber = days.indexOf(day);
    return weekdayNumber;
  },

  isBeforeTomorrow(day) {
    const today = new Date();
    return day <= today;
  },
};

export default dateComp;
