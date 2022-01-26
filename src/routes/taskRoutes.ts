import { FastifyInstance } from 'fastify';

import{ getTasks, addTask, getTask, updateTask, deleteTask } from '../controllers/tasksController';
import { checkAuth } from '../middleware/checkauth';


const { Task } = require('../models/models');

const getTasksOpts = {
  schema: {
    response: {
      201: Task
    }
  },
  preHandler:  [checkAuth],
  handler: getTasks
};

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId'],
      properties: Task.properties
    }
  },
  response: {
    200: Task
  },
  preHandler:  [checkAuth],
  handler: addTask
}

const getSingleTaskOpts = {
  schema: {
    response: {
      201: Task
    }
  },
  preHandler:  [checkAuth],
  handler: getTask
};

const updateTaskOpts = {
  schema: {
    response: {
      200: Task
    }
  },
  preHandler:  [checkAuth],
  handler: updateTask
};

const deleteTaskOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
  },
  preHandler:  [checkAuth],
  handler: deleteTask
}

function taskRoutes(app: FastifyInstance, options: object, done: () => void) {
  // Get all tasks
  app.get('/boards/:boardId/tasks', getTasksOpts);

  // Post Task
  app.post('/boards/:boardId/tasks', postTaskOpts);

  // Get single task
  app.get('/boards/:boardId/tasks/:taskId', getSingleTaskOpts);

  // Update board
  app.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  // Delete board
  app.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
}

module.exports = taskRoutes;
