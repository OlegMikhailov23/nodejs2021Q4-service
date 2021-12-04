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

module.exports = {
  User,
  Board,
  Column
};
