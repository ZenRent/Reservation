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
};

export default dateComp;
