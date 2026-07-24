This backend is built using Express.js and TypeScript. It fetches data from [WeatherAPI.com](https://www.weatherapi.com/) and features SQLite caching system to minimize external API calls and speed up response times.

## Backend includes 2 endpoints:

### 1. Realtime Weather
* **URL:** `/api/v1/realtime-weather`
* **Method:** `GET`
* **Description:** Returns the current weather conditions for Gliwice and Hamburg. Includes actual temperature, "feels like" temperature, and a weather condition description.
* **Source:** `src/api/realtime-weather.ts`

### 2. Weather Forecast
* **URL:** `/api/v1/forecast-weather`
* **Method:** `GET`
* **Query Parameters:** `?date=YYYY-MM-DD` (Required)
* **Example:** `/api/v1/forecast-weather?date=2026-07-24`
* **Description:** Returns the weather forecast (average temperature and condition description) for the specific day provided in the query string.
* **Source:** `src/api/forecast-weather.ts`

## Environment Variables (in .env file)

to run this backend locally, you must create a `.env` file in this directory (the `backend` folder) or copy and rename .env_sample to .env and enter the following keys:

```env
NODE_ENV=development
PORT=5000
WEATHER_API_KEY=your_weatherapi_key_here
```

## Database (Caching)

This project uses SQLite to cache responses. 
You do not need to set up a database server. Upon running the backend for the first time, a local `weather_app.db` file will be automatically generated and configured with the required tables.


Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
