# Weather App

> A modern weather application built with Vue, Nuxt, and Tailwind CSS. This app provides real-time weather information using the OpenMeteo API and a predefined list of locations. It features a responsive design, location management, and detailed weather forecasts.


## Built With

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)  
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)  
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-000000?style=for-the-badge&logo=sqlalchemy&logoColor=white)  
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)  
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)   


## Live Demo

[Live Demo Link](https://weather-app-dashboard-seven.vercel.app/)


### Setup
If you wish to run the project locally, please do the following:

1.- Clone the repository to your local machine.

#### Frontend:
1.- Install Node.js and npm if you haven't already.
   To install Node.js, follow the instructions on [Node.js](https://nodejs.org/en/).
   
   To install npm with the necessary dependencies, run the following command in your terminal:
   ``` bash
   npm install 
   ```
2.- Go to the dashboard directory:

``` bash
cd src/dashboard
```

3.- Create a .env file in the src/dashboard directory and copy the contents of .env.example into .env and replace the placeholders with their actual values.:

4.- Once you have the setup and the project locally, you can run the project using the following command in your terminal:
``` bash
npm run build
```
5.- and if you want to watch the changes live, run the following command (it will run the website on localhost:3000):
``` bash
npm run dev
```
#### Backend:

1.- Go to the api directory:

``` bash
cd src/api
```

2.- Create a .env file in the src/api directory and copy the contents of .env.example into .env and replace the placeholders with their actual values.:


3.- Install the requirements:

``` bash
pip install -r requirements.txt
```

4.- Start the server:

``` bash
uvicorn main:app --reload
```

## Features

### Main Page

- **Weather Table:** Displays weather information for each chosen location, including:
  - An icon representing the weather condition (based on the WMO code).
  - The location's name.
  - The current temperature in degrees Celsius.
  - The current rainfall in millimeters.
  - A "Remove" button for each location. Clicking this button triggers a confirmation popup before the location is deleted from the table.

![Weather Table](/design/table.png)

### Detailed Forecast

- **Forecast Sidebar:** Clicking on a row within the table opens a sidebar. This sidebar provides a detailed temperature and rainfall forecast for the next 7 days for the selected location.

![Forecast Sidebar](/design/sidebar.png)

### Location Management

- **Add Location:** A button above the table allows users to add new locations. This opens a popup where users can search for and select a location to add to the table. The form cannot be submitted if no location is selected.

![Add Location Modal](/design/modal.png)


👤 **Author**

- GitHub: [@Terbeche](https://github.com/Terbeche)
- Twitter: [@twitterhandle](https://x.com/Terbech_Mostefa)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/mustapha-terbeche/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Terbeche/weather-app/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments


- To fetch weather information, you are to use the [OpenMeteo API](https://open-meteo.com/).
- For location data, [Predefined list of locations](https://gist.github.com/ofou/df09a6834a8421b4f376c875194915c9).








