# ZenRent Reservation

> Reservation module for ZenRent application (built-from-scratch clone of existing application).

## Related Projects

  - https://github.com/ZenRent/Gallery
  - https://github.com/ZenRent/Reviews
  - https://github.com/ZenRent/More-Places-To-Stay

## Table of Contents

* [Usage](#Usage)
  * [API](#API)
    * [Spec](#Spec)
    * [Example](#Example)
  * [Back-end Configuration](#Back-end-Configuration)
    * [Server](#Server)
    * [Database](#Database)
  * [Front-end Configuration](#Front-end-Configuration)
* [Development](#Development)
    * [Installing Dependencies](#Installing-Dependencies)
    * [Reseeding Database](#Reseeding-Database)
    * [Running Application](#Running-Application)

## Usage

### API

#### Spec

* Endpoint 1: `/api/listings`
  * Method: GET
  * Response: Data for a random listing
* Endpoint 2: `/api/listings/<id>`
  * Method: GET
  * Route parameter: Pass target listing's ID number
  * Response: Data for target listing
* Both endpoints respond with the same data in the same format
  * The only difference is retrieving data for a random listing vs. for a specified listing

#### Example

* GET request to: `/api/listings/42`
* Response:

```json
{
    "averageRating": 1.12,
    "reviewCount": 0,
    "minNights": 3,
    "maxGuests": 5,
    "cleaningFee": 0,
    "serviceFee": 0,
    "occupancyTaxesAndFees": 2090,
    "discountWeekly10": -0.1,
    "discountWeekly20": -0.2,
    "discountMonthly20": -0.2,
    "_id": "600e2f2026332d9136f210f3",
    "listingId": 42,
    "nightlyRate": 14327,
    "calendarUTCDates": [
        {
            "_id": "600e2f2026332d9136f210f4",
            "date": "2021-01-01T18:00:00.000Z",
            "isBooked": false
        },
        {
            "_id": "600e2f2026332d9136f210f5",
            "date": "2021-01-02T18:00:00.000Z",
            "isBooked": false
        },
        {
            "_id": "600e2f2026332d9136f210f6",
            "date": "2021-01-03T18:00:00.000Z",
            "isBooked": false
        },
        {
            "_id": "600e2f2026332d9136f210f7",
            "date": "2021-01-04T18:00:00.000Z",
            "isBooked": false
        },
        {
            "_id": "600e2f2026332d9136f210f8",
            "date": "2021-01-05T18:00:00.000Z",
            "isBooked": false
        },
        // `calendarUTCDates` array has been truncated here for readability,
        // but every date in range is included in response.
        {
            "_id": "600e2f2026332d9136f216db",
            "date": "2025-02-20T18:00:00.000Z",
            "isBooked": false
        },
        {
            "_id": "600e2f2026332d9136f216dc",
            "date": "2025-02-21T18:00:00.000Z",
            "isBooked": true
        },
        {
            "_id": "600e2f2026332d9136f216dd",
            "date": "2025-02-22T18:00:00.000Z",
            "isBooked": true
        },
        {
            "_id": "600e2f2026332d9136f216de",
            "date": "2025-02-23T18:00:00.000Z",
            "isBooked": false
        },
        {
            "_id": "600e2f2026332d9136f216df",
            "date": "2025-02-24T18:00:00.000Z",
            "isBooked": true
        }
    ],
    "createdAt": "2021-01-25T02:38:27.467Z",
    "updatedAt": "2021-01-25T02:38:27.467Z",
    "__v": 0
}
```

### Back-end Configuration

This application currently uses the following configuration.

#### Server

* Port: `3002`

#### Database

* DBMS: MongoDB
* Port: `27017`
* Database name: `zenrent`
* Model name: `Listing`
* Collection name: `listings`

### Front-end Configuration

* HTML `div` ID for mounting application: `Reservation`

## Development

### Installing Dependencies

From within the root directory:

```sh
$ npm install -g webpack
$ npm install
```

### Reseeding Database

To reseed the database, run the following commands from within the root directory:

```sh
$ npm run erase-db
$ npm run seed-db
```

### Running Application

From within the root directory, start the server:

```sh
$ npm start
```

And build the client-side application bundle:

```sh
$ npm run react-dev
```

Then open either `http://localhost:3002` or `http://localhost:3002/<id>` in a browser, where `<id>` is the ID for a listing (by default, any number between `1` and `100`, inclusive).

* `http://localhost:3002` will display data for a random listing
* `http://localhost:3002/<id>` will display data for the specified listing ID
