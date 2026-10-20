require('dotenv').config();

const express = require('express');
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const app = express();
const connectToDB = require('./config/db');

const brandRoute = require('./routes/brandRoutes');

//middleware
app.use(express.json());
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
  res.status(200).json(`Testing route`);
});

app.use('/api/brands', brandRoute);

//error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//starting server
const port = process.env.PORT || 5001;

async function startServer() {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (err) {
    console.log('There is an error!', err);
    process.exitCode = 1;
  }
}

startServer();
