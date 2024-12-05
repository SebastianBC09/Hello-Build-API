const express = require('express');
const app = express();
const port = 4000;

app.get('/', (response, request) => {
  response.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`Hello World app listening at port ${4000}`);
})
