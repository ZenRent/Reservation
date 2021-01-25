const dateComp = {
  convertBookedDatesToList(bookedDates) {
    const bookedDatesList = [];
    bookedDates.forEach((bookedDateSpan) => {
      const { start, length } = bookedDateSpan;
      const bookedDate = new Date(start);
      for (let i = 0; i < length; i += 1) {
        bookedDatesList.push(new Date(bookedDate));
        bookedDate.setDate(bookedDate.getDate() + 1);
      }
    });
    return bookedDatesList;
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

  // getEarliestAvailableDate(bookedDates) {
  //   const currentDate = new Date();
  //   for (let i = 0; i < bookedDates.length; i += 1) {
  //     const { start, length } = bookedDates[i];
  //     const bookedUntil = new Date(start);
  //     bookedUntil.setDate(bookedUntil.getDate() + length);
  //     const dayAfterLastBooked = new Date(bookedUntil);
  //     dayAfterLastBooked.setDate(dayAfterLastBooked.getDate() + 1);
  //     const nextBookingStart = new Date(bookedDates[i + 1].start);
  //     if (dayAfterLastBooked.getDate() < nextBookingStart.getDate()) {
  //       if (currentDate.getDate() < dayAfterLastBooked.getDate()) {
  //         return dayAfterLastBooked;
  //       }
  //     }
  //   }
  //   return null;
  // },

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

  // getWeeksAndDays(monthDate, bookedDates) {
  //   const bookedDatesList = this.convertBookedDatesToList(bookedDates);
  //   const month = monthDate.getMonth();
  //   const weekdayNumber = this.getWeekdayNumber(monthDate);
  //   const weeksAndDays = [];
  //   let currentWeek = [];
  //   for (let i = 0; i < weekdayNumber; i += 1) {
  //     currentWeek.push('');
  //   }
  //   while (monthDate.getMonth() === month) {
  //     const currentDay = new Date(monthDate);
  //     currentWeek.push(
  //       {
  //         date: currentDay,
  //         isBooked: this.isBooked(currentDay, bookedDatesList),
  //       },
  //     );
  //     monthDate.setDate(monthDate.getDate() + 1);
  //     if (currentWeek.length === 7) {
  //       weeksAndDays.push(currentWeek);
  //       currentWeek = [];
  //     } else if (monthDate.getMonth() !== month) {
  //       while (currentWeek.length < 7) {
  //         currentWeek.push('');
  //       }
  //       weeksAndDays.push(currentWeek);
  //     }
  //   }
  //   return weeksAndDays;
  // },

  // getWeeksAndDays(monthDate) {
  //   const month = monthDate.getMonth();
  //   const weekdayNumber = this.getWeekdayNumber(monthDate);
  //   const weeksAndDays = [];
  //   let currentWeek = [];
  //   for (let i = 0; i < weekdayNumber; i += 1) {
  //     currentWeek.push('');
  //   }
  //   while (monthDate.getMonth() === month) {
  //     currentWeek.push(new Date(monthDate));
  //     monthDate.setDate(monthDate.getDate() + 1);
  //     if (currentWeek.length === 7) {
  //       weeksAndDays.push(currentWeek);
  //       currentWeek = [];
  //     } else if (monthDate.getMonth() !== month) {
  //       while (currentWeek.length < 7) {
  //         currentWeek.push('');
  //       }
  //       weeksAndDays.push(currentWeek);
  //     }
  //   }
  //   return weeksAndDays;
  // },

  getWeeksAndDays(monthUTCDates) {
    const firstDayOfMonth = new Date(monthUTCDates[0].date);
    // const month = firstDayOfMonth.getMonth();
    // const month = monthDate.getMonth();
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
    // while (monthDate.getMonth() === month) {
    //   currentWeek.push(new Date(monthDate));
    //   monthDate.setDate(monthDate.getDate() + 1);
    //   if (currentWeek.length === 7) {
    //     weeksAndDays.push(currentWeek);
    //     currentWeek = [];
    //   } else if (monthDate.getMonth() !== month) {
    //     while (currentWeek.length < 7) {
    //       currentWeek.push('');
    //     }
    //     weeksAndDays.push(currentWeek);
    //   }
    // }
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

  isBooked(day, bookedDatesList) {
    const localeStringOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const simpleDay = day.toLocaleString('ja-JP', localeStringOptions);
    for (let i = 0; i < bookedDatesList.length; i += 1) {
      const bookedDate = bookedDatesList[i];
      const simpleBookedDay = bookedDate.toLocaleString('ja-JP', localeStringOptions);
      if (simpleDay === simpleBookedDay) {
        return true;
      }
      if (simpleDay < simpleBookedDay) {
        return false;
      }
    }
    return false;
  },
};

export default dateComp;
