const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

const app = express();
const port = 3000;

// read the bodies of the incoming JSON object
app.use(express.json());
app.use(express.urlencoded());

// log HTTP requests and errors
app.use(morgan('dev'));

// bypass the same-origin policy
app.use(cors());

// decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// serve up static files in dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`currently listening on localhost:${port}`));