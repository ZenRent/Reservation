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
* [Requirements](#Requirements)
* [Development](#Development)
    * [Installing Dependencies](#Installing-Dependencies)
    * [Reseeding Database](#Reseeding-Database)

## Usage

### API

#### Spec

* Endpoint: `/api/listings/<id>`
* Method: GET
* Route parameter: Pass target listing's ID number

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

* Port: `3003`

#### Database

* DBMS: MongoDB
* Port: `27017`
* Database name: `zenrent`
* Model name: `Listing`
* Collection name: `listings`

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

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
