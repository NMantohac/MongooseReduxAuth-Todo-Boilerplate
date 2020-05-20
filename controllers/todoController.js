const { Todo } = require('../models');

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      if (!todos) {
        return res.status(404).json({ error: 'No todos found' });
      }
      return res.status(200).json(todos);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
