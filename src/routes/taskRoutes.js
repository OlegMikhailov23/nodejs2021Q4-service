const { getTasks, addTask, getTask, updateTask, deleteTask } = require('../controllers/tasksController');


const { Task } = require('../models/models');

const getTasksOpts = {
  schema: {
    response: {
      201: Task
    }
  },
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
  handler: addTask
}

const getSingleTaskOpts = {
  schema: {
    response: {
      201: Task
    }
  },
  handler: getTask
};

const updateTaskOpts = {
  schema: {
    response: {
      200: Task
    }
  },
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
  handler: deleteTask
}

function taskRoutes(app, options, done) {
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
