const { getTasks, addTask } = require('../controllers/tasksController');


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
      required: ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
      properties: Task.properties
    }
  },
  response: {
    200: Task
  },
  handler: addTask
}

function taskRoutes(app, options, done) {
  // Get all tasks
  app.get('/boards/:boardId/tasks', getTasksOpts);

  // Post Task
  app.post('/boards/:boardId/tasks', postTaskOpts);

  // // Get Board
  // app.get('/boards/:id', getSingleBoardOpts);
  //
  // // Update board
  // app.put('/boards/:id', updateBoardOpts);
  //
  // // Delete board
  // app.delete('/boards/:id', deleteBoardOpts)

  done();
}

module.exports = taskRoutes;
