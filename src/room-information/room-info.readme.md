# Hotel Room Information API

This `README` details the Hotel Room Information API which serves as an interface for clients to retrieve hotel room and rate plan details in an XML format based on the OTA (OpenTravel Alliance) specifications.

## Overview

The API integrates several components to process requests and serve responses, including middleware for authentication, TypeORM entities for database schema representation, services for business logic, and controllers for request handling.

## Components

### POS Middleware

- **Purpose**: Authenticates incoming XML requests.
- **Operation**: Parses XML to JSON, validates credentials within the POS element, and controls request access.

### Entities

- **Purpose**: Represent data tables in the database.
- **Components**:
  - `Hotel`: Table for hotels with a one-to-many relationship to `RoomType`.
  - `RoomType`: Room types available, linked to `Hotel` and `RatePlan`.
  - `RatePlan`: Pricing plans for room types.

### RoomInformationService

- **Purpose**: Manages retrieval and formatting of room information.
- **Key Functions**:
  - `getRoomInformation`: Fetches and structures room data into a response object.
  - `createRoomListJson`: Generates structured JSON for room listings.
  - `convertToXML`: Transforms JSON responses to XML format.

### RoomInformationController

- **Purpose**: Handles room information request endpoints.
- **Operation**: Processes requests, invokes service layer for data retrieval, and formats responses in XML.

### Database Integration with TypeORM

- **Purpose**: Facilitates database interactions for the application.
- **Operation**: Maps entities to database tables, uses repositories for CRUD operations, and formats data according to OTA protocol.

## Workflow

1. A POST request with XML payload is received.
2. `POS Middleware` authenticates the request based on credentials.
3. Upon successful authentication, `RoomInformationController` processes the request.
4. It extracts `HotelCode` after converting XML to JSON.
5. `RoomInformationService` is invoked to retrieve corresponding room details.
6. Retrieved data is formatted into a JSON response adhering to the OTA_HotelRoomListRS structure.
7. The JSON response is converted to XML.
8. The XML response is sent back to the requester.

## Prerequisites

- Node.js
- NestJS
- MySQL

## Setup and Installation

- Install dependencies with `npm install`.

## Usage

Send a POST request to `/room-information` with an XML payload containing the hotel code. The response will include room and rate plan information formatted according to OTA specifications.

## Error Handling

The system uses custom error handling to provide meaningful error messages and appropriate HTTP status codes in case of failed authentication or request processing issues.

## Future Work

- Implementation of additional OTA message types.
- Enhancement of the authentication mechanism to support advanced security features.
- Expansion of the database schema to include more detailed hotel and room information.


## Authors

- [Muhammed Ogunsanya]

