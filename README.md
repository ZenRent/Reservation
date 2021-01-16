# ZenRent Reservation

> Reservation module for ZenRent application (built-from-scratch clone of existing application).

## Related Projects

  - https://github.com/ZenRent/Gallery
  - https://github.com/ZenRent/Reviews
  - https://github.com/ZenRent/More-Places-To-Stay

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### API

#### Spec

* Endpoint: `/api/listings/<id>`
* Method: GET
* Route parameter: Pass target listing's ID number

#### Example

* GET request to: `/api/listings/42`
* Response:

``` json
{
    "averageRating": 4.81,
    "reviewCount": 282,
    "minNights": 1,
    "maxGuests": 10,
    "cleaningFee": 1898,
    "serviceFee": 2312,
    "occupancyTaxesAndFees": 1554,
    "discountWeekly10": -0.1,
    "discountWeekly20": -0.2,
    "discountMonthly20": 0,
    "_id": "60036a66343db5cec258fd84",
    "listingId": 42,
    "nightlyRate": 17149,
    "bookedDates": [
        {
            "_id": "60036a66343db5cec258fd85",
            "start": "2021-01-21T22:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd86",
            "start": "2021-01-31T22:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd87",
            "start": "2021-02-20T22:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd88",
            "start": "2021-02-25T22:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd89",
            "start": "2021-03-02T22:36:22.000Z",
            "length": 3
        },
        {
            "_id": "60036a66343db5cec258fd8a",
            "start": "2021-03-07T22:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd8b",
            "start": "2021-03-22T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd8c",
            "start": "2021-04-01T21:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fd8d",
            "start": "2021-04-06T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd8e",
            "start": "2021-04-11T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd8f",
            "start": "2021-04-16T21:36:22.000Z",
            "length": 2
        },
        {
            "_id": "60036a66343db5cec258fd90",
            "start": "2021-04-21T21:36:22.000Z",
            "length": 3
        },
        {
            "_id": "60036a66343db5cec258fd91",
            "start": "2021-04-26T21:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fd92",
            "start": "2021-05-11T21:36:22.000Z",
            "length": 3
        },
        {
            "_id": "60036a66343db5cec258fd93",
            "start": "2021-05-16T21:36:22.000Z",
            "length": 2
        },
        {
            "_id": "60036a66343db5cec258fd94",
            "start": "2021-05-21T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd95",
            "start": "2021-05-26T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd96",
            "start": "2021-05-31T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd97",
            "start": "2021-06-05T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd98",
            "start": "2021-06-10T21:36:22.000Z",
            "length": 3
        },
        {
            "_id": "60036a66343db5cec258fd99",
            "start": "2021-06-15T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd9a",
            "start": "2021-06-25T21:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fd9b",
            "start": "2021-06-30T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd9c",
            "start": "2021-07-05T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fd9d",
            "start": "2021-07-10T21:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fd9e",
            "start": "2021-07-15T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fd9f",
            "start": "2021-07-20T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fda0",
            "start": "2021-07-25T21:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fda1",
            "start": "2021-08-09T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fda2",
            "start": "2021-08-14T21:36:22.000Z",
            "length": 3
        },
        {
            "_id": "60036a66343db5cec258fda3",
            "start": "2021-08-19T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fda4",
            "start": "2021-08-24T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fda5",
            "start": "2021-09-03T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fda6",
            "start": "2021-09-23T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fda7",
            "start": "2021-09-28T21:36:22.000Z",
            "length": 3
        },
        {
            "_id": "60036a66343db5cec258fda8",
            "start": "2021-10-03T21:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fda9",
            "start": "2021-10-18T21:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fdaa",
            "start": "2021-10-23T21:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fdab",
            "start": "2021-10-28T21:36:22.000Z",
            "length": 2
        },
        {
            "_id": "60036a66343db5cec258fdac",
            "start": "2021-11-12T22:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fdad",
            "start": "2021-12-02T22:36:22.000Z",
            "length": 5
        },
        {
            "_id": "60036a66343db5cec258fdae",
            "start": "2021-12-07T22:36:22.000Z",
            "length": 2
        },
        {
            "_id": "60036a66343db5cec258fdaf",
            "start": "2021-12-17T22:36:22.000Z",
            "length": 1
        },
        {
            "_id": "60036a66343db5cec258fdb0",
            "start": "2021-12-22T22:36:22.000Z",
            "length": 4
        },
        {
            "_id": "60036a66343db5cec258fdb1",
            "start": "2022-01-16T22:36:22.000Z",
            "length": 5
        }
    ],
    "createdAt": "2021-01-16T22:36:22.519Z",
    "updatedAt": "2021-01-16T22:36:22.519Z",
    "__v": 0
}
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
