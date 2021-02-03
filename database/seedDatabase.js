const { Listing } = require('./Listing.js');

const docsToCreate = 100;
const numberOfFutureMonthsToGenerate = 50;

const upperLimits = {
  nightlyRate: {
    limit: 50000,
    canBeZero: false,
  },
  averageRating: {
    limit: 500,
    canBeZero: false,
  },
  reviewCount: {
    limit: 500,
    canBeZero: true,
  },
  minNights: {
    limit: 3,
    canBeZero: false,
  },
  maxGuests: {
    limit: 10,
    canBeZero: false,
  },
  cleaningFee: {
    limit: 5000,
    canBeZero: true,
  },
  serviceFee: {
    limit: 3000,
    canBeZero: true,
  },
  occupancyTaxesAndFees: {
    limit: 3000,
    canBeZero: true,
  },
  discountWeekly10: {
    limit: -0.1,
    canBeZero: true,
  },
  discountWeekly20: {
    limit: -0.2,
    canBeZero: true,
  },
  discountMonthly20: {
    limit: -0.2,
    canBeZero: true,
  },
};

const rollD3 = () => {
  const threeSidedDie = Math.floor(Math.random() * 3);
  return threeSidedDie;
};

const rollD4 = () => {
  const fourSidedDie = Math.floor(Math.random() * 4);
  return fourSidedDie;
};

const getRandomValue = ({ limit, canBeZero }) => {
  if (canBeZero) {
    if (rollD4() === 0) {
      return 0;
    }
  }
  return limit < 0 ? limit : Math.ceil(Math.random() * limit);
};

const decideIfBooked = () => rollD3() === 1;

const convertMonthsToDays = (months) => {
  const years = months / 12;
  const weeks = 52 * years;
  return Math.floor(weeks * 7);
};

const getCalendarUTCDates = () => {
  const calendarUTCDates = [];
  const currentMonth = new Date();
  const calendarUTCDate = new Date(
    Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), 1, 18, 0, 0, 0),
  );
  const numberOfDates = convertMonthsToDays(numberOfFutureMonthsToGenerate);
  for (let i = 0; i < numberOfDates; i += 1) {
    calendarUTCDates.push(
      {
        date: calendarUTCDate.toUTCString(),
        isBooked: decideIfBooked(),
      },
    );
    calendarUTCDate.setDate(calendarUTCDate.getDate() + 1);
  }
  return calendarUTCDates;
};

let recordsCreated = 0;

const createRecord = () => {
  const mongoDoc = {
    listingId: recordsCreated + 1,
    nightlyRate: getRandomValue(upperLimits.nightlyRate),
    averageRating: (getRandomValue(upperLimits.averageRating) / 100),
    reviewCount: getRandomValue(upperLimits.reviewCount),
    minNights: getRandomValue(upperLimits.minNights),
    calendarUTCDates: getCalendarUTCDates(),
    maxGuests: getRandomValue(upperLimits.maxGuests),
    cleaningFee: getRandomValue(upperLimits.cleaningFee),
    serviceFee: getRandomValue(upperLimits.serviceFee),
    occupancyTaxesAndFees: getRandomValue(upperLimits.occupancyTaxesAndFees),
    discountWeekly10: getRandomValue(upperLimits.discountWeekly10),
    discountWeekly20: getRandomValue(upperLimits.discountWeekly20),
    discountMonthly20: getRandomValue(upperLimits.discountMonthly20),
  };
  return mongoDoc;
};

const addDocument = (mongoDoc) => {
  Listing.create(mongoDoc, (err) => {
    if (err) {
      console.error(err);
      setTimeout(() => process.exit(), 500);
    } else {
      recordsCreated += 1;
      console.log(`Records created: ${recordsCreated}`);
      if (recordsCreated < docsToCreate) {
        addDocument(createRecord());
      } else {
        setTimeout(() => process.exit(), 500);
      }
    }
  });
};

addDocument(createRecord());

console.log('\n-------- Synchronous execution complete --------\n');
