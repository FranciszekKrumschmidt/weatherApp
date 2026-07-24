# Frontend Client - Weather App

This is the frontend user interface for the Weather App, built with **React**, **TypeScript**, and **Vite**. It provides a clean, responsive dashboard to view current weather conditions and an interactive 7-day forecast specifically for Gliwice and Hamburg.


## Environment Variables (.env)
If the .env file in backend folder uses non-dafault port you have to create a `.env` file inside the `frontend` directory. 

Since this project uses Vite, environment variables must be prefixed with `VITE_`:

```env
VITE_API_PORT=5000
```

## Available Scripts

Make sure you are inside the `frontend` directory. You can run the following commands:

* `npm run dev` - Starts the Vite development server.
* `npm run build` - Compiles the TypeScript code and builds the app for production into the `dist` folder.
* `npm run lint` - Runs ESLint to check for code quality and style issues.