const express = require('express')
const mongoose = require("mongoose");
const router = express.Router();
const { addTodo, fetchTodo, fetchOneTodo, updateTodo, deleteTodo } = require('../controllers/productController')
const protectRoute = require('../middleware/authMiddleware')

router.post("/", protectRoute, addTodo);
router.get("/", protectRoute, fetchTodo);
router.get("/:id", protectRoute, fetchOneTodo);
router.put("/:id", protectRoute, updateTodo);
router.delete("/:id", protectRoute, deleteTodo);

module.exports = router;