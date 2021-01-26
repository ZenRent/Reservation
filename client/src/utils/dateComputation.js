const dateComp = {
  getDateString(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const dateString = `${month}/${day}/${year}`;
    return dateString;
  },

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
        // const currentUTCDate = this.convertDateStringToUTCDate(currentUTCDateData.date);
        const nextUTCDate = new Date(currentUTCDate);
        nextUTCDate.setDate(nextUTCDate.getDate() + 1);
        if (!isInCurrentMonth
          && nextMonth.getFullYear() === currentUTCDate.getFullYear()
          && nextMonth.getMonth() === currentUTCDate.getMonth()) {
          isInCurrentMonth = true;
        }
        if (isInCurrentMonth) {
          currentUTCDateData = this.addStatus(
            currentUTCDateData,
            checkInDate,
            checkOutDate,
            calendarUTCDates,
          );
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

  convertDateStringToUTCDate(UTCDateString) {
    const datePartStrings = UTCDateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/).slice(1, 8);
    const datePartNumbers = datePartStrings.map((digitString) => parseInt(digitString, 10));
    const UTCDate = new Date(Date.UTC(
      datePartNumbers[0],
      datePartNumbers[1] - 1,
      datePartNumbers[2],
      datePartNumbers[3],
      datePartNumbers[4],
      datePartNumbers[5],
      datePartNumbers[6],
    ));
    return UTCDate;
  },

  addStatus(currentUTCDateData, checkInDate, checkOutDate, calendarUTCDates) {
    const currentUTCDate = new Date(currentUTCDateData.date);
    const currentUTCDateDataWithStatus = {};
    Object.assign(currentUTCDateDataWithStatus, currentUTCDateData);
    const checkInDateDetail = this.getDateDetail(checkInDate);
    const checkOutDateDetail = this.getDateDetail(checkOutDate);
    if (this.checkIfBeforeCheckIn(currentUTCDate, checkInDateDetail)) {
      currentUTCDateDataWithStatus.status = 'beforeCheckInDate';
    } else if (checkInDate.length >= 8
      && this.checkIfAfterBooked(currentUTCDate, checkInDateDetail, calendarUTCDates)) {
      currentUTCDateDataWithStatus.status = 'afterBookedDate';
    } else if (this.checkDateMatch(currentUTCDate, checkInDateDetail)
      && checkOutDate.length >= 8) {
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

  convertDateDetailToDateObjZero(dateDetail) {
    const date = new Date(Date.UTC(
      Number(dateDetail.year),
      (Number(dateDetail.month) - 1),
      Number(dateDetail.day),
      0, 0, 0, 0,
    ));
    return date;
  },

  getUTCDateWithZeroHours(UTCDate) {
    const UTCDateZero = new Date(UTCDate);
    UTCDateZero.setHours(0, 0, 0, 0);
    return UTCDateZero;
  },

  checkIfBeforeCheckIn(currentUTCDate, checkInDateDetail) {
    const checkInDate = this.convertDateDetailToDateObjZero(checkInDateDetail);
    // const checkInDate = new Date(Date.UTC(
    //   Number(checkInDateDetail.year),
    //   (Number(checkInDateDetail.month) - 1),
    //   Number(checkInDateDetail.day),
    //   0, 0, 0, 0,
    // ));
    const currentUTCDateZero = this.getUTCDateWithZeroHours(currentUTCDate);
    // const currentUTCDateZero = new Date(currentUTCDate);
    // currentUTCDateZero.setHours(0, 0, 0, 0);
    return currentUTCDateZero < checkInDate;
  },

  checkIfAfterBooked(currentUTCDate, checkInDateDetail, calendarUTCDates) {
    const currentUTCDateZero = this.getUTCDateWithZeroHours(currentUTCDate);
    const checkInDateZero = this.convertDateDetailToDateObjZero(checkInDateDetail);
    if (currentUTCDateZero < checkInDateZero) {
      return false;
    }
    let nextBookedDateNotFound = true;
    let increment = 0;
    let nextBookedDateZero;
    while (nextBookedDateNotFound) {
      if (calendarUTCDates[increment].isBooked) {
        const bookedUTCDate = new Date(calendarUTCDates[increment].date);
        const bookedUTCDateZero = this.getUTCDateWithZeroHours(bookedUTCDate);
        if (bookedUTCDateZero > checkInDateZero) {
          nextBookedDateNotFound = false;
          nextBookedDateZero = bookedUTCDateZero;
        }
      }
      increment += 1;
    }
    return currentUTCDateZero > nextBookedDateZero;
  },

  checkDateMatch(currentUTCDate, dateDetail) {
    const year = currentUTCDate.getFullYear().toString() === dateDetail.year;
    const month = (currentUTCDate.getMonth() + 1).toString() === dateDetail.month;
    const day = currentUTCDate.getDate().toString() === dateDetail.day;
    return year && month && day;
  },

  checkDateRange(currentUTCDate, checkInDateDetail, checkOutDateDetail) {
    const checkInDate = this.convertDateDetailToDateObjZero(checkInDateDetail);
    // const checkInDate = new Date(Date.UTC(
    //   Number(checkInDateDetail.year),
    //   (Number(checkInDateDetail.month) - 1),
    //   Number(checkInDateDetail.day),
    //   0, 0, 0, 0,
    // ));
    const checkOutDate = this.convertDateDetailToDateObjZero(checkOutDateDetail);
    // const checkOutDate = new Date(Date.UTC(
    //   Number(checkOutDateDetail.year),
    //   (Number(checkOutDateDetail.month) - 1),
    //   Number(checkOutDateDetail.day),
    //   0, 0, 0, 0,
    // ));
    const currentUTCDateZero = this.getUTCDateWithZeroHours(currentUTCDate);
    // const currentUTCDateZero = new Date(currentUTCDate);
    // currentUTCDateZero.setHours(0, 0, 0, 0);
    return currentUTCDateZero > checkInDate && currentUTCDateZero < checkOutDate;
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
