// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

// local dependencies
const views = require('./routes/views');

router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root: '../public/html' });
});

// initialize express app
const app = express();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set routes
app.use('/', views);
app.use('/static', express.static('public'));
app.use('/', express.static('dist'));

// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

// port config
const port = 5000; // config variable
const server = http.Server(app);
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});
