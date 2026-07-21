# Weather App ⛅️

A full-stack web application that provides real-time weather and 14-day forecasts specifically tailored for **Gliwice, Poland** and **Hamburg, Germany**. 

The application features a custom backend with an intelligent caching system. It uses a local SQLite database to store historical data and recent forecasts, minimizing external API calls and improving response times.

Based on a template from nubisoft:
https://github.com/nubisoft/nubiweather-recruitment

## Tech Stack

| Part | Technologies |
|---|---|
| **Frontend** | React, TypeScript |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite (Auto-generated on startup) |
| **Tooling** | npm Workspaces, Concurrently |

## Prerequisites

Before you begin, ensure you have:
* Node.js installed on your machine.
* A free API key from [WeatherAPI](https://www.weatherapi.com/).

## Setup & Installation

**1. Install Dependencies**
Thanks to npm workspaces, a single command installs all required packages for both the frontend and backend.
```sh
npm install
```

**2. Configure Environment Variables**
Create a `.env` file in the `backend` folder and add your API key and preferred port (5000 by default):
```env
WEATHER_API_KEY=your_api_key_here
PORT=your_preffered_port
```

## Running the Application

You can spin up both the React frontend and Express backend simultaneously with a single command:
```sh
npm run dev
```