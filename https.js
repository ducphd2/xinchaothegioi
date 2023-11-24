const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  console.log('Hello world');
  res.send(200).json({ message: 'Hello world' });
});

require('greenlock-express')
  .init({
    packageRoot: __dirname,
    configDir: 'greenlock.d',
    maintainerEmail: 'ducclone00@gmail.com',
    cluster: false,
  })
  .serve(app);
