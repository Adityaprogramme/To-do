const Task = require('../model/productModel')

// Add Todo (with user association)
const addTodo = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.title || req.body.completed === undefined) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }

        // Create new todo and associate it with logged-in user
        const data = new Task({
            title: req.body.title,
            completed: req.body.completed,
            user: req.user.id // user ID from token
        });
        await data.save();

        res.status(201).json(data); // Send saved data as response
    } catch (error) {
        res.status(500).json({ message: "TODO FAILED", error: error.message });
    }
}

// Fetch all todos (populate user data)
const fetchTodo = async (req, res) => {
    try {
        const todos = await Task.find({ user: req.user.id }).populate('user', 'email'); // Populate user details if needed
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "NO TODOS", error: error.message });
    }
}

// Fetch a specific todo by ID
const fetchOneTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Task.findOne({ _id: id, user: req.user.id }); // Ensure the todo belongs to the logged-in user

        if (!todo) {
            return res.status(404).json({ message: "No such todo found" });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todo", error: error.message });
    }
}

// Update Todo
const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, completed } = req.body;

        // Check if todo exists and belongs to the logged-in user
        const todo = await Task.findOne({ _id: id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: "No such todo found" });
        }

        // Update todo
        const updatedTodo = await Task.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true, runValidators: true } // Return updated document
        );

        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({ message: "Error updating todo", error: error.message });
    }
}

// Delete Todo
const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if todo exists and belongs to the logged-in user
        const todo = await Task.findOne({ _id: id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: "No such todo found" });
        }

        await Task.findByIdAndDelete(id);

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
}

module.exports = { 
    addTodo, 
    fetchTodo, 
    fetchOneTodo, 
    updateTodo, 
    deleteTodo 
}