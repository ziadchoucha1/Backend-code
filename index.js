const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRouter = require('./routes/ProjectRouter.js');
const authRouter = require('./routes/authRoutes.js');

// Create an instance of the Express application
const app = express();
dotenv.config();

app.use(cors());

// Use middleware to parse JSON data from request bodies
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const taskRouter = require('./routes/TaskRoutes.js');

// Mount the task router
app.use('/tasks', taskRoutes);

// Mount the project router
app.use('/projects', projectRoutes);

// Optionally, mount auth routes if needed
app.use('/auth', authRouter);

module.exports = {
  app,
};
