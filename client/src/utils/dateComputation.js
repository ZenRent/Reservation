const dateComp = {
  getEarliestAvailableDate(bookedDates) {
    const currentDate = new Date();
    for (let i = 0; i < bookedDates.length; i += 1) {
      const { start, length } = bookedDates[i];
      const bookedUntil = new Date(start);
      bookedUntil.setDate(bookedUntil.getDate() + length);
      const dayAfterLastBooked = new Date(bookedUntil);
      dayAfterLastBooked.setDate(dayAfterLastBooked.getDate() + 1);
      const nextBookingStart = new Date(bookedDates[i + 1].start);
      if (dayAfterLastBooked.getDate() < nextBookingStart.getDate()) {
        if (currentDate.getDate() < dayAfterLastBooked.getDate()) {
          return dayAfterLastBooked;
        }
      }
    }
    return null;
  },

  getWeeksAndDays(monthDate) {
    const month = monthDate.getMonth();
    // const nextMonth = new Date(monthDate);
    // nextMonth.setMonth(nextMonth.getMonth() + 1);
    // nextMonth.setDate(nextMonth.getDate() + 1);
    const weekdayNumber = this.getWeekdayNumber(monthDate);
    const weeksAndDays = [];
    let currentWeek = [];
    for (let i = 0; i < weekdayNumber; i += 1) {
      currentWeek.push('');
    }
    while (monthDate.getMonth() === month) {
    // while (monthDate < nextMonth) {
      currentWeek.push(new Date(monthDate));
      monthDate.setDate(monthDate.getDate() + 1);
      if (currentWeek.length === 7) {
        weeksAndDays.push(currentWeek);
        currentWeek = [];
      } else if (monthDate.getMonth() !== month) {
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
};

export default dateComp;
