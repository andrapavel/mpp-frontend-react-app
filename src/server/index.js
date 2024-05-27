// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // In-memory user storage (for demonstration; use a database in production)
// const users = [];

// // In-memory team storage (for demonstration; use a database in production)
// let teams = [
//     {id: 1, name: 'Team 1', drivers: [], constructors: []},
//     {id: 2, name: 'Team 2', drivers: [], constructors: []},
// ];

// // JWT secret key (use environment variables in production)
// const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

// // Authentication middleware
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token)
//         return res
//             .status(401)
//             .json({message: 'Access denied. No token provided.'});

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res
//                     .status(401)
//                     .json({message: 'Access denied. Token has expired.'});
//             }
//             return res.status(403).json({message: 'Access denied.'});
//         }
//         req.user = user;
//         next();
//     });
// };

// // Register endpoint
// app.post('/api/register', async (req, res) => {
//     const {username, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = {id: Date.now(), username, password: hashedPassword};
//     users.push(user);
//     res.status(201).json({message: 'User registered successfully'});
// });

// // Login endpoint
// app.post('/api/login', async (req, res) => {
//     const {username, password} = req.body;
//     const user = users.find((user) => user.username === username);
//     if (user && (await bcrypt.compare(password, user.password))) {
//         const token = jwt.sign(
//             {id: user.id, username: user.username},
//             JWT_SECRET,
//             {expiresIn: '30s'}, // Token expires in 30 seconds
//         );
//         res.json({token});
//     } else {
//         res.status(401).json({message: 'Invalid username or password'});
//     }
// });

// // CRUD operations for teams
// app.get('/api/teams', authenticateToken, (req, res) => {
//     res.json(teams);
// });

// app.post('/api/teams', authenticateToken, (req, res) => {
//     const newTeam = req.body;
//     teams.push(newTeam);
//     res.status(201).json(newTeam);
// });

// app.put('/api/teams/:id', authenticateToken, (req, res) => {
//     const id = parseInt(req.params.id);
//     const updatedTeam = req.body;
//     teams = teams.map((team) => (team.id === id ? updatedTeam : team));
//     res.json(updatedTeam);
// });

// app.delete('/api/teams/:id', authenticateToken, (req, res) => {
//     const id = parseInt(req.params.id);
//     teams = teams.filter((team) => team.id !== id);
//     res.json({message: 'Team deleted successfully'});
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB session store
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/sessiondb', // Replace with your MongoDB URI
    collection: 'sessions',
});

store.on('error', function (error) {
    console.log(error);
});

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your_fallback_session_secret',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 30, // 30 seconds
        },
    }),
);

// In-memory user storage (for demonstration; use a database in production)
const users = [];

// In-memory team storage (for demonstration; use a database in production)
let teams = [
    {id: 1, name: 'Team 1', drivers: [], constructors: []},
    {id: 2, name: 'Team 2', drivers: [], constructors: []},
];

// JWT secret key (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

// Authentication middleware
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token)
//         return res
//             .status(401)
//             .json({message: 'Access denied. No token provided.'});

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res
//                     .status(401)
//                     .json({message: 'Access denied. Token has expired.'});
//             }
//             return res.status(403).json({message: 'Access denied.'});
//         }
//         req.user = user;
//         next();
//     });
// };

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res
                        .status(401)
                        .json({message: 'Access denied: Token expired'});
                }
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Register endpoint
app.post('/api/register', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {id: Date.now(), username, password: hashedPassword};
    users.push(user);
    res.status(201).json({message: 'User registered successfully'});
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const user = users.find((user) => user.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            {id: user.id, username: user.username},
            JWT_SECRET,
            {expiresIn: '30s'}, // Token expires in 30 seconds
        );
        req.session.userId = user.id;
        res.json({token});
    } else {
        res.status(401).json({message: 'Invalid username or password'});
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({message: 'Failed to logout'});
        }
        res.clearCookie('connect.sid');
        res.status(200).json({message: 'Logged out successfully'});
    });
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({message: 'Unauthorized'});
    }
};

// CRUD operations for teams
app.get('/api/teams', authenticateToken, (req, res) => {
    res.json(teams);
});

app.post('/api/teams', authenticateToken, (req, res) => {
    const newTeam = req.body;
    teams.push(newTeam);
    res.status(201).json(newTeam);
});

app.put('/api/teams/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTeam = req.body;
    teams = teams.map((team) => (team.id === id ? updatedTeam : team));
    res.json(updatedTeam);
});

app.delete('/api/teams/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    teams = teams.filter((team) => team.id !== id);
    res.json({message: 'Team deleted successfully'});
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
