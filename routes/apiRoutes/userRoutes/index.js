const router = require('express').Router();
const {
  addTodo,
  getAllUserEmails,
  getAllUserTodos,
  deleteUserTodoById,
  updateUserTodoById,
} = require('../../../controllers/userController');

const { requireAuth } = require('../../../middlewares/authMiddleware');

// /api/user

// /api/user/todos
router.route('/todos')
  .get(requireAuth, getAllUserTodos)
  .post(requireAuth, addTodo);

router.route('/todos/:todoId')
  .put(requireAuth, updateUserTodoById)
  .delete(requireAuth, deleteUserTodoById);

// /api/user/emails
router.get('/emails', getAllUserEmails);

module.exports = router;
