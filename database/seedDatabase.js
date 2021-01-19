const database = require('./index.js');
const { Listing } = require('./Listing.js');

const docsToCreate = 100;
const numberOfFutureMonthsToBook = 12;
const maxBookingLength = 5;

Listing.collection.drop();

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

const getRandomValue = ({ limit, canBeZero }) => {
  if (canBeZero) {
    const fourSidedDie = Math.floor(Math.random() * 4);
    if (fourSidedDie === 0) {
      return 0;
    }
  }
  return limit < 0 ? limit : Math.ceil(Math.random() * limit);
};

const convertMonthsToDays = (months) => {
  const years = months / 12;
  const weeks = 52 * years;
  return Math.floor(weeks * 7);
};

const getRandomDateRanges = () => {
  const dateRanges = [];
  const days = convertMonthsToDays(numberOfFutureMonthsToBook);
  const date = new Date();
  for (let i = 0; i < days; i += maxBookingLength) {
    date.setDate(date.getDate() + maxBookingLength);
    const fourSidedDie = Math.floor(Math.random() * 4);
    if (fourSidedDie > 0) {
      const booking = {
        start: date.toUTCString(),
        length: getRandomValue({ limit: 5, canBeZero: false }),
      };
      dateRanges.push(booking);
    }
  }
  return dateRanges;
};

let recordsCreated = 0;

const addDocument = (mongoDoc, callback) => {
  Listing.create(mongoDoc, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      recordsCreated++;
      console.log(`Records created: ${recordsCreated}`);
      if (callback) {
        setTimeout(callback, 500);
      }
    }
  });
};

for (let i = 0; i < docsToCreate; i++) {
  const mongoDoc = {
    listingId: i + 1,
    nightlyRate: getRandomValue(upperLimits.nightlyRate),
    averageRating: (getRandomValue(upperLimits.averageRating) / 100),
    reviewCount: getRandomValue(upperLimits.reviewCount),
    minNights: getRandomValue(upperLimits.minNights),
    bookedDates: getRandomDateRanges(),
    maxGuests: getRandomValue(upperLimits.maxGuests),
    cleaningFee: getRandomValue(upperLimits.cleaningFee),
    serviceFee: getRandomValue(upperLimits.serviceFee),
    occupancyTaxesAndFees: getRandomValue(upperLimits.occupancyTaxesAndFees),
    discountWeekly10: getRandomValue(upperLimits.discountWeekly10),
    discountWeekly20: getRandomValue(upperLimits.discountWeekly20),
    discountMonthly20: getRandomValue(upperLimits.discountMonthly20),
  };
  let callback;
  if (i === docsToCreate - 1) {
    callback = () => {
      process.exit();
    };
  }
  addDocument(mongoDoc, callback);
}

console.log('\n-------- Synchronous execution complete --------\n');
