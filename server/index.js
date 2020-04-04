const express = require('express');

require('dotenv').config();
const bootstrap = require('./services/bootstrap');
require('./services/mongoose');

bootstrap(express);
