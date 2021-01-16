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
    "averageRating": 1,
    "reviewCount": 398,
    "minNights": 1,
    "maxGuests": 10,
    "cleaningFee": 0,
    "serviceFee": 0,
    "occupancyTaxesAndFees": 0,
    "discountWeekly10": 0,
    "discountWeekly20": -0.2,
    "discountMonthly20": -0.2,
    "_id": "600292114ed7c1b44e9be3af",
    "listingId": 42,
    "nightlyRate": 35037,
    "bookedDates": [
        {
            "_id": "600292114ed7c1b44e9be3b0",
            "start": "2021-01-31T07:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3b1",
            "start": "2021-02-10T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3b2",
            "start": "2021-02-15T07:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3b3",
            "start": "2021-02-20T07:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3b4",
            "start": "2021-02-25T07:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3b5",
            "start": "2021-03-02T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3b6",
            "start": "2021-03-07T07:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3b7",
            "start": "2021-03-12T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3b8",
            "start": "2021-03-17T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3b9",
            "start": "2021-03-22T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3ba",
            "start": "2021-03-27T06:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3bb",
            "start": "2021-04-01T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3bc",
            "start": "2021-04-16T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3bd",
            "start": "2021-04-21T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3be",
            "start": "2021-04-26T06:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3bf",
            "start": "2021-05-06T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3c0",
            "start": "2021-05-16T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3c1",
            "start": "2021-05-21T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3c2",
            "start": "2021-05-26T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3c3",
            "start": "2021-05-31T06:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3c4",
            "start": "2021-06-05T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3c5",
            "start": "2021-06-10T06:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3c6",
            "start": "2021-06-15T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3c7",
            "start": "2021-06-25T06:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3c8",
            "start": "2021-07-10T06:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3c9",
            "start": "2021-07-15T06:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3ca",
            "start": "2021-07-20T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3cb",
            "start": "2021-07-25T06:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3cc",
            "start": "2021-07-30T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3cd",
            "start": "2021-08-04T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3ce",
            "start": "2021-08-09T06:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3cf",
            "start": "2021-08-14T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3d0",
            "start": "2021-08-24T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3d1",
            "start": "2021-08-29T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3d2",
            "start": "2021-09-03T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3d3",
            "start": "2021-09-08T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3d4",
            "start": "2021-09-13T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3d5",
            "start": "2021-09-18T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3d6",
            "start": "2021-09-23T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3d7",
            "start": "2021-10-03T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3d8",
            "start": "2021-10-08T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3d9",
            "start": "2021-10-13T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3da",
            "start": "2021-10-18T06:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3db",
            "start": "2021-10-23T06:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3dc",
            "start": "2021-10-28T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3dd",
            "start": "2021-11-02T06:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3de",
            "start": "2021-11-07T06:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3df",
            "start": "2021-11-12T07:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3e0",
            "start": "2021-11-17T07:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3e1",
            "start": "2021-11-22T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3e2",
            "start": "2021-11-27T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3e3",
            "start": "2021-12-02T07:13:21.000Z",
            "length": 3
        },
        {
            "_id": "600292114ed7c1b44e9be3e4",
            "start": "2021-12-12T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3e5",
            "start": "2021-12-17T07:13:21.000Z",
            "length": 5
        },
        {
            "_id": "600292114ed7c1b44e9be3e6",
            "start": "2021-12-22T07:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3e7",
            "start": "2021-12-27T07:13:21.000Z",
            "length": 1
        },
        {
            "_id": "600292114ed7c1b44e9be3e8",
            "start": "2022-01-01T07:13:21.000Z",
            "length": 2
        },
        {
            "_id": "600292114ed7c1b44e9be3e9",
            "start": "2022-01-11T07:13:21.000Z",
            "length": 4
        },
        {
            "_id": "600292114ed7c1b44e9be3ea",
            "start": "2022-01-16T07:13:21.000Z",
            "length": 2
        }
    ],
    "createdAt": "2021-01-16T07:13:21.334Z",
    "updatedAt": "2021-01-16T07:13:21.334Z",
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
