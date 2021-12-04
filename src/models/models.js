const User = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    login: {type: 'string'},
    password: {type: 'string'}
  }
}

const Column = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    order: {type: 'number'},
  }
}

const Board = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    columns: {
      type: 'array',
      properties: Column.properties
    },
  }
}

const Task = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    order: {type: 'number'},
    description: {type: 'string'},
    boardId: {type: 'string'},
    columnId: {type: 'string'},
  }
}

module.exports = {
  User,
  Board,
  Column,
  Task,
};
