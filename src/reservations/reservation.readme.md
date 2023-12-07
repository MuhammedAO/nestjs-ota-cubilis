# Hotel Reservation API

This documentation outlines the hotel reservation API functionality, including the endpoints, DTOs, entities, and services used to manage hotel reservations.

## Overview

The Hotel Reservation API processes reservation requests in XML format according to the OTA (OpenTravel Alliance) specifications. It handles new reservations, modifies existing ones, and manages room stays, rate plans, guest counts, comments, and customer profiles.

## Technology Stack

- NestJS as the backend framework
- TypeORM with DataSource for database interaction
- MySQL as the database system
- DTOs (Data Transfer Objects) for validating request data
- XML parsing for handling request and response formats

### Prerequisites

- Node.js
- NestJS
- MySQL

## Setup and Installation

- Install dependencies with `npm install`.

## API Reference

### Endpoints

- `POST /reservations` - Endpoint for creating or updating hotel reservations.

### Request and Response Format

- The endpoint accepts and returns data in XML format, conforming to the OTA specification.

## Entity Relationships

- `HotelReservation`: Represents the reservation made by a guest.
- `RoomStay`: Contains details about the room stay associated with a reservation.
- `RoomType`: Represents the type of room booked.
- `RatePlan`: Contains pricing and rate details for the room stay.
- `GuestCount`: Details the number of guests and their age qualifications.
- `Comment`: Stores comments related to either the reservation or room stays.
- `ProfileInfo`: Contains customer profile information.

## DTOs

DTOs are used to capture and validate incoming data before it is processed by the service layer.

- `ReservationDTO`: Data structure for reservation data.
- `RoomStayDTO`: Nested data structure within `ReservationDTO` for room stay details.
- `RoomTypeDTO`: Nested within `RoomStayDTO` for room type specifics.
- `...Others`  : 

## Services

The `ReservationsService` is responsible for the business logic:

- `createOrUpdateReservation`: Manages transactional save operations for reservations and related data.

## Error Handling

Errors are captured and appropriate HTTP status codes along with error messages are returned to the client.

## Future Enhancements

- Implementation of the pull method as a fallback strategy.
- Addition of more comprehensive error handling and validation logic.
- Integration of a payment processing service.


## Authors

- [Muhammed Ogunsanya]

