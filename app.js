const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method == 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}));

const PORT = process.env.PORT || 5000;

// mongoose.connect("mongodb+srv://kaushal:pUVO7ky27oJAEkAx@node-jvfv6.mongodb.net/node_2?authSource=admin&replicaSet=Node-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-jvfv6.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
  .then(result => {
    console.log('connected!');
    app.listen(PORT);
  })
  .catch(err => console.log(err));