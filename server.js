const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { protect } = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/.env' });

const app = express();

app.use(express.json());

app.use(protect);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: errorHandler
  })
);

connectDB();
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Error: ${err}`);
});
