const bcrypt = require("bcrypt");
const { User } = require('../Models');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const role = 'user'; // Default role
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

        // Send user data including role
        res.status(200).json({ 
            message: "Login successful", 
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user role
exports.updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Only allow changing to 'admin' or 'user' role
        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ error: "Invalid role. Role must be either 'admin' or 'user'" });
        }

        await user.update({ role });
        res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role'] // Exclude password
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};