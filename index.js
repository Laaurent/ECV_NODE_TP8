const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Import handlers & modules
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');
const authRoutes = require('./routes/auth.routes');
const rolesRoutes = require('./routes/roles.routes');
const commentsRoutes = require('./routes/comments.routes');

const { correctionTp1 } = require('./handlers/main.handler');

const protectedRoute = require('./middlewares/auth');

const errorHandler = require('./middlewares/error-handler.middleware');
const joiErrorHandler = require('./middlewares/joi-error-handler.middleware');

// Import libs
app.use(bodyParser.json());

// Routes
app.get('/correction-tp1', correctionTp1);


app.get('/error', (req, res) => {
  throw new Error('ça marche pas');
})

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/roles', rolesRoutes);
app.use('/comments', commentsRoutes);

app.use(joiErrorHandler);
app.use(errorHandler);

//app.use('/auth', authRoutes);

// Run app
app.listen(3000);
