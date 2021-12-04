const db =  [
  {
    id: 'users',
    users: [],
  },
  {
    id: 'boards',
    boards: [],
  }
];

const [users, boards] = db;

module.exports = {
  users,
  boards
};
