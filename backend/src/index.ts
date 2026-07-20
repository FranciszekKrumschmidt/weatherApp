import app from './app';
import { initDB } from './database';

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});


const startServer = async () => {
  try {
    await initDB();
  } catch (error) {
    console.error("Couldn't start database", error);
  }
}
startServer();