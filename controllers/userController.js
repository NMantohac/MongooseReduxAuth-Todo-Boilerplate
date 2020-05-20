const { Todo, User } = require('../models');

module.exports = {
  addTodo: async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'You must provide a text' });
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
    const { email } = req.query;
    try {
      const userEmail = await User.findOne({ email }, 'email');
      return res.status(200).json(userEmail);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getAllUserTodos: async (req, res) => {
    // console.log(req.user);
    try {
      // const user = await User.findById(req.user._id).populate('todos');
      // return res.status(200).json(user.todos);
      const todos = await Todo.find({ user: req.user._id });
      return res.status(200).json(todos);
    } catch (e) {
      return res.status(403).json(e);
    }
  },
  deleteUserTodoById: async (req, res) => {
    const { todoId } = req.params;
    // console.log(req.user);
    try {
      const todoToDelete = await Todo.findById(todoId);
      if (!todoToDelete) {
        return res.status(401).json({ error: 'No todo with that id' });
      }

      // Check if the todo does not belong to the user.
      // if it doesnt, do not allow the user to delete it

      // // No two objects are ever the same -> returns false
      // console.log(typeof req.user._id);
      // console.log(typeof todoToDelete.user);

      // This check is to see if the todo belongs to the logged in User (object -> string)
      if (req.user._id.toString() !== todoToDelete.user.toString()) {
        return res.status(401).json({ error: 'You cannot delete a todo that is not yours' });
      }
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      return res.status(200).json(deletedTodo);
    } catch (e) {
      return res.status(403).json(e);
    }
  },
  updateUserTodoById: async (req, res) => {
    const { todoId } = req.params;
    const { completed, text } = req.body;
    if (!text) {
      return res.status(401).json({ error: 'You must provide a text for the todo' });
    }
    try {
      const todoToUpdate = await Todo.findById(todoId);
      if (!todoToUpdate) {
        return res.status(404).json({ error: 'No todo with that id' });
      }

      if (req.user._id.toString() !== todoToUpdate.user.toString()) {
        return res.status(401).json({ error: 'You cannot update a todo that is not yours' });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(todoId, { $set: { completed, text } }, { new: true });
      return res.status(200).json(updatedTodo);
    } catch (e) {
      return res.status(403).json(e);
    }
  },
};
