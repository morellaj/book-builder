const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/*', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`, (err) => {
    if (err) {
      response.status(500).send(err);
    }
  });
});


// eslint-disable-next-line no-unused-vars
const listener = app.listen(process.env.PORT, () => {

});
