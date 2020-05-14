const { Todo, User } = require('./../models');

module.exports = {
  addTodo: async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'You must provide a test' });
    }

    try {
      const newTodo = await new Todo({ text, user: req.user._id }).save();
      req.user.todos.push(newTodo);
      await req.user.save();
      return res.status(200).json(newTodo);
    } catch (e) {
      return res.status(403).json(e);
    }
  },
  getAllUserEmails: async (req, res) => {
    try {
      const users = await User.find({}, 'email');
      if (!users) {
        return res.status(404).json({ error: 'No user found' })
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status(403).json(e);
    }
  }
}