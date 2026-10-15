require('dotenv').config();
require('express-async-error');

const express = require('express');
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const app = express();

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

function startServer() {
  app.listen(port, () => {
    //connectdb
    console.log(`Server running on port ${port}...`);
  });
}

startServer();
