import { FastifyInstance } from 'fastify';
import { Board } from '../models/models';
import { checkAuth } from '../middleware/checkauth';

const { getBoards, addBoard, getBoard, updateBoard, deleteBoard } = require('../controllers/boardsControllerr');

const getBoardsOpts = {
  schema: {
    response: {
      201: Board
    }
  },
  preHandler:  [checkAuth],
  handler: getBoards
};

const postBoardOpts = {
  schema: {
    body: { // Validate Board
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: {
          type: 'array',
          items: {
            type: 'object',
            required: ['title', 'order'],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              order: { type: 'number' }
            }
          }
        }
      }
    }
  },
  response: {
    200: Board
  },
  preHandler:  [checkAuth],
  handler: addBoard
};

const getSingleBoardOpts = {
  schema: {
    response: {
      201: Board
    }
  },
  preHandler:  [checkAuth],
  handler: getBoard
};

const updateBoardOpts = {
  schema: {
    response: {
      200: Board
    }
  },
  preHandler:  [checkAuth],
  handler: updateBoard
};

const deleteBoardOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  preHandler:  [checkAuth],
  handler: deleteBoard
};

function boardRoutes(app: FastifyInstance, options: object, done: () => void): void {
  // Get all boards
  app.get('/boards', getBoardsOpts);

  // Post Board
  app.post('/boards', postBoardOpts);

  // Get Board
  app.get('/boards/:id', getSingleBoardOpts);

  // Update board
  app.put('/boards/:id', updateBoardOpts);

  // Delete board
  app.delete('/boards/:id', deleteBoardOpts);

  done();
}

module.exports = boardRoutes;
