const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { commentsRouter } = require('./routes/comments.routes');
const compression = require('compression');
const morgan = require('morgan');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

//Helmet (mejora la seguridad)
app.use(helmet())

//Compression
app.use(compression())

//log incoming
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else app.use(morgan('combined'))

app.use(morgan('dev'))

// Enable incoming JSON data
app.use(express.json());

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/comments', commentsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
