const db =  [
  {
    id: 'users',
    users: [],
  },
  {
    id: 'boards',
    boards: [],
  },
  {
    id: 'tasks',
    tasks: [],
  }
];

const [users, boards, tasks] = db;

module.exports = {
  users,
  boards,
  tasks,
};
