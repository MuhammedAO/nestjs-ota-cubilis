# Hotel Availability API Documentation

This document provides an overview and documentation for the Hotel Availability API, which is designed to synchronize hotel room availability data with a booking platform.

## Overview

The API receives availability data in XML format according to the OTA (OpenTravel Alliance) specifications and updates the availability status for a single hotel. It's built using NestJS framework with TypeORM for MySQL database interaction.

## Technology Stack

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: MySQL
- **Languages**: TypeScript, XML

## Setup and Installation

- Install dependencies with `npm install`.


## API Reference

### Endpoints

- `POST /availability/update` - Endpoint for updating hotel room availability.

### Request Format

The endpoint accepts XML data structured according to the OTA specifications with elements such as `RoomType`, `RatePlan`, and `AvailabilityStatus`.

### Response Format

The API responds with an XML formatted according to the OTA_HotelAvailNotifRS specification, indicating the success or failure of the update operation.

## Entity Relationships

- `RoomType`: Represents different types of rooms in the hotel.
- `RatePlan`: Different pricing plans available for rooms.
- `AvailabilityStatus`: Availability data for rooms associated with `RoomType` and `RatePlan`.
- `LengthOfStay`: Rules for the minimum and maximum length of stay.
- `BestAvailableRate`: Price data for the room under certain conditions.

## Service Logic

The service layer contains the core business logic for processing and updating availability data within a transactional context to ensure data integrity.

### Transaction Management

The service uses manual transaction management to ensure all updates are consistent and to maintain database integrity.

## Error Handling

Errors are logged, and appropriate HTTP status codes are returned to the client in case of failure.

## Future Enhancements

- Implement additional endpoints for full CRUD operations on room types and rate plans.
- Improve error handling with more descriptive messages.



## Authors

- [Muhammed Ogunsanya]

