# DataCose Code Challenge: Weather App

## Overview

Create a full-stack weather dashboard application utilizing Nuxt 3 for the frontend, Nuxt UI for user interface elements, and FastAPI for the backend. This application will showcase current weather conditions for user-selected locations and provide detailed forecasts.

### Project Setup

You will be provided with a starter template that includes a configured Nuxt 3 frontend and a FastAPI backend. You are required to use this template. Feel free to install additional packages as needed to complete the challenge.

### Design

You must adhere to the design outlined in the screenshots within this document. It is essential to follow not just the layout but also the colors and other details as specified in the screenshots within this document. You can find the used icons in the `icons` folder.

## Challenge Requirements

### Main Page

-   **Weather Table:** The homepage should feature a table displaying weather information for each chosen location, including:
    -   An icon representing the weather condition, based on the WMO code.
    -   The location's name.
    -   The current temperature in degrees Celsius.
    -   The current rainfall in millimeters.
    -   A "Remove" button for each location. Clicking this button should trigger a confirmation popup before the location is deleted from the table.

![table](/design/table.png)

### Detailed Forecast

-   **Forecast Sidebar:** Clicking on a row within the table should open a sidebar. This sidebar will provide a detailed temperature and rainfall forecast for the next 7 days for the selected location.

![table](/design/sidebar.png)

### Location Management

-   **Add Location:** Incorporate a button above the table to add new locations. This will open a popup where users can search for and select a location to add to the table. Make sure the user can't submit the form if no location was selected.

![table](/design/modal.png)

### Database Integration

- Implement SQLAlchemy with a local Postgres database.
- Design a `Location` model with attributes including id, name, latitude, and longitude.

### API Endpoints

- **Manage Locations:**
  - `GET /locations`: Retrieve a list of all locations saved in the database, including their current weather conditions. This requires integrating with the [OpenMeteo API](https://open-meteo.com/) to fetch weather data based on latitude and longitude.
  - `POST /locations`: Allow adding a new location by providing name, latitude, and longitude.
  - `DELETE /locations/{id}`: Enable location deletion by ID.

- **Weather Forecast:**
  - `GET /forecast/{location_id}`: Provide a detailed 7-day weather forecast for a specified location. This endpoint will call the OpenMeteo API to fetch forecast data based on the location's latitude and longitude stored in the database.


### API Integration

-   To fetch weather information, you are to use the [OpenMeteo API](https://open-meteo.com/). Given that this API requires latitude and longitude for location data, utilize [this predefined list of locations](https://gist.github.com/ofou/df09a6834a8421b4f376c875194915c9) as your hardcoded source.

## Evaluation Criteria

Your submission will be assessed based on:

-   **Functionality:** Adherence to the requirements and overall functionality of the application.
-   **Code Quality:** Organization, readability, and documentation of code.
-   **UI/UX Design:** The usability and aesthetic appeal of the application interface.
-   **Innovation and Creativity:** Any additional features or enhancements that improve the app's functionality or user experience.

## Submission Guidelines

-   Your completed project should be submitted as a ZIP file.
-   Include a Loom video walking through the UI.

We look forward to seeing your innovative solution. Best of luck!
