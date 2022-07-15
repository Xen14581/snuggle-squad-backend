const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./gql_schema");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");

const app = express();
const appoloserver = new ApolloServer({
  schema: schema,
  formatError: (err) => {
    console.log(err);
    return err;
  },
});

mongoose.connect(config.mongoUrl).then(async () => {
  console.log("Connected to MongoDB");
  await appoloserver.start();

  app.use(cors());
  app.options("*", cors());

  appoloserver.applyMiddleware({ app: app });
  app.listen(config.port, () =>
    console.log(`Listening to Port ${config.port}`)
  );
});
