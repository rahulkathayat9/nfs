import app from './app.js';
import dotenv from 'dotenv';
import env from './config/env.js'
import errorMiddleware from './middleware/error.middleware.js';

dotenv.config()

const PORT = env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})

app.get('/error', () => {
  throw new Error("this is a test error")
})

app.use(errorMiddleware)
