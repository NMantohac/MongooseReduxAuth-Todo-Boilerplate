const router = require('express').Router();
const { addTodo, getAllUserEmails, getAllUserTodos, deleteUserTodoById } = require('./../../../controllers/userController');

const { requireAuth } = require('./../../../middlewares/authMiddleware');

// /api/user

// /api/user/todos
router.route('/todos')
  .get(requireAuth, getAllUserTodos)
  .post(requireAuth, addTodo);

router.route('/todos/:todoId')
  .delete(requireAuth, deleteUserTodoById);

// /api/user/emails
router.get('/emails', getAllUserEmails);

module.exports = router;