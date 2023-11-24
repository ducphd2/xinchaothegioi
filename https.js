const express = require('express');
const app = require('/server');

require('greenlock-express')
  .init({
    packageRoot: __dirname,
    configDir: 'greenlock.d',
    maintainerEmail: 'ducclone00@gmail.com',
    cluster: false,
  })
  .serve(app);
