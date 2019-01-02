const express = require('express');
const graphqlHTTp = require('express-graphql');
const schema = require('./schema');
const app = express();

app.use(
  '/graphql',
  graphqlHTTp({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started in PORT ${PORT}`);
});
