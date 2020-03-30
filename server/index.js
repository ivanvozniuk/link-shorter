const express = require('express');
const next = require('next');

require('dotenv').config();
const bootstrap = require('./services/bootstrap');
require('./services/bootstrap');
require('./services/mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './client' });
const handle = app.getRequestHandler();

app.prepare().then(() => bootstrap(express(), handle));
