// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB session store
// const store = new MongoDBStore({
//     uri: 'mongodb://localhost:27017/sessiondb', // Replace with your MongoDB URI
//     collection: 'sessions',
// });

// store.on('error', function (error) {
//     console.log(error);
// });

// // Session middleware
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET || 'your_fallback_session_secret',
//         resave: false,
//         saveUninitialized: false,
//         store: store,
//         cookie: {
//             maxAge: 1000 * 30, // 30 seconds
//         },
//     }),
// );

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
// // const authenticateToken = (req, res, next) => {
// //     const authHeader = req.headers['authorization'];
// //     const token = authHeader && authHeader.split(' ')[1];
// //     if (!token)
// //         return res
// //             .status(401)
// //             .json({message: 'Access denied. No token provided.'});

// //     jwt.verify(token, JWT_SECRET, (err, user) => {
// //         if (err) {
// //             if (err.name === 'TokenExpiredError') {
// //                 return res
// //                     .status(401)
// //                     .json({message: 'Access denied. Token has expired.'});
// //             }
// //             return res.status(403).json({message: 'Access denied.'});
// //         }
// //         req.user = user;
// //         next();
// //     });
// // };

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (token) {
//         jwt.verify(token, JWT_SECRET, (err, user) => {
//             if (err) {
//                 if (err.name === 'TokenExpiredError') {
//                     return res
//                         .status(401)
//                         .json({message: 'Access denied: Token expired'});
//                 }
//                 return res.sendStatus(403);
//             }
//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
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
//         req.session.userId = user.id;
//         res.json({token});
//     } else {
//         res.status(401).json({message: 'Invalid username or password'});
//     }
// });

// // Logout endpoint
// app.post('/api/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({message: 'Failed to logout'});
//         }
//         res.clearCookie('connect.sid');
//         res.status(200).json({message: 'Logged out successfully'});
//     });
// });

// // Middleware to check if user is authenticated
// const isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//         next();
//     } else {
//         res.status(401).json({message: 'Unauthorized'});
//     }
// };

// // CRUD operations for teams
// app.get('/api/teams', (req, res) => {
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

// module.exports = app;

//

//

///

//
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// const app = express();
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/your_database', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Session management
// app.use(
//     session({
//         secret: JWT_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//             mongoUrl: 'mongodb://localhost:27017/your_database',
//         }),
//         cookie: {maxAge: 1000 * 60 * 30}, // 30 minutes
//     }),
// );

// // In-memory user storage (for demonstration; use a database in production)
// const users = [];

// // Authentication middleware
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (token == null) return res.status(401).json({message: 'Access denied'});

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({message: 'Access denied'});
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
//         req.session.token = token;
//         res.json({token});
//     } else {
//         res.status(401).json({message: 'Invalid username or password'});
//     }
// });

// // Logout endpoint
// app.post('/api/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) return res.status(500).json({message: 'Failed to logout'});
//         res.clearCookie('connect.sid');
//         res.json({message: 'Logged out successfully'});
//     });
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

//

//

//

//

//

//

// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// const app = express();
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here'; // Replace with an actual secret key

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/teamsDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// // Mongoose schemas and models
// const teamSchema = new mongoose.Schema({
//     name: String,
//     drivers: Array,
//     constructors: Array,
// });

// const userSchema = new mongoose.Schema({
//     username: {type: String, unique: true},
//     password: String,
// });

// const Team = mongoose.model('Team', teamSchema);
// const User = mongoose.model('User', userSchema);

// // Session management
// app.use(
//     session({
//         secret: JWT_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//             mongoUrl: 'mongodb://localhost:27017/sessions',
//         }),
//         cookie: {maxAge: 1800000}, // 30 minutes
//     }),
// );

// // Authentication middleware
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (token) {
//         jwt.verify(token, JWT_SECRET, (err, user) => {
//             if (err) return res.status(403).json({message: 'Access denied'});
//             req.user = user;
//             next();
//         });
//     } else {
//         res.status(401).json({message: 'Access denied'});
//     }
// };

// // Register endpoint
// app.post('/api/register', async (req, res) => {
//     const {username, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({username, password: hashedPassword});

//     try {
//         await user.save();
//         res.status(201).json({message: 'User registered successfully'});
//     } catch (error) {
//         res.status(400).json({message: 'Registration failed', error});
//     }
// });

// // Login endpoint
// app.post('/api/login', async (req, res) => {
//     const {username, password} = req.body;
//     const user = await User.findOne({username});

//     if (user && (await bcrypt.compare(password, user.password))) {
//         const token = jwt.sign(
//             {id: user._id, username: user.username},
//             JWT_SECRET,
//             {expiresIn: '30s'},
//         );
//         req.session.token = token;
//         res.json({token});
//     } else {
//         res.status(401).json({message: 'Invalid username or password'});
//     }
// });

// // Logout endpoint
// app.post('/api/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({message: 'Logout failed'});
//         }
//         res.clearCookie('connect.sid');
//         res.json({message: 'Logged out successfully'});
//     });
// });

// // CRUD operations for teams
// app.get('/api/teams', authenticateToken, async (req, res) => {
//     try {
//         const teams = await Team.find();
//         res.json(teams);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to fetch teams', error});
//     }
// });

// app.post('/api/teams', authenticateToken, async (req, res) => {
//     const newTeam = new Team(req.body);

//     try {
//         await newTeam.save();
//         res.status(201).json(newTeam);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to add team', error});
//     }
// });

// app.put('/api/teams/:id', authenticateToken, async (req, res) => {
//     const id = req.params.id;

//     try {
//         const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });
//         res.json(updatedTeam);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to update team', error});
//     }
// });

// app.delete('/api/teams/:id', authenticateToken, async (req, res) => {
//     const id = req.params.id;

//     try {
//         await Team.findByIdAndDelete(id);
//         res.json({message: 'Team deleted successfully'});
//     } catch (error) {
//         res.status(500).json({message: 'Failed to delete team', error});
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/teamsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Mongoose schemas and models
const teamSchema = new mongoose.Schema({
    name: String,
    drivers: Array,
    constructors: Array,
});

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
});

const Team = mongoose.model('Team', teamSchema);
const User = mongoose.model('User', userSchema);

// Session management
app.use(
    session({
        secret: JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/sessions',
        }),
        cookie: {maxAge: 1800000}, // 30 minutes
    }),
);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Access denied'});

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Access denied'});
        req.user = user;
        next();
    });
};

// Register endpoint
// app.post('/api/register', async (req, res) => {
//     const {username, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({username, password: hashedPassword});

//     try {
//         await user.save();
//         res.status(201).json({message: 'User registered successfully'});
//     } catch (error) {
//         res.status(400).json({message: 'Registration failed', error});
//     }
// });

app.post('/api/register', async (req, res) => {
    const {username, password} = req.body;
    console.log('Registering user:', username); // Log the username
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});

    try {
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.error('Registration error:', error); // Log the error with detailed information
        res.status(400).json({
            message: 'Registration failed',
            error: error.message,
        });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            {id: user._id, username: user.username},
            JWT_SECRET,
            {expiresIn: '1m'}, // Token expires in 1 minute
        );
        req.session.token = token;
        res.json({token});
    } else {
        res.status(401).json({message: 'Invalid username or password'});
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({message: 'Logout failed'});
        }
        res.clearCookie('connect.sid');
        res.json({message: 'Logged out successfully'});
    });
});

// CRUD operations for teams
app.get('/api/teams', authenticateToken, async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch teams', error});
    }
});

app.post('/api/teams', authenticateToken, async (req, res) => {
    const newTeam = new Team(req.body);

    try {
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({message: 'Failed to add team', error});
    }
});

// app.put('/api/teams/:id', authenticateToken, async (req, res) => {
//     const id = req.params.id;

//     try {
//         const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });
//         res.json(updatedTeam);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to update team', error});
//     }
// });

// app.delete('/api/teams/:id', authenticateToken, async (req, res) => {
//     try {
//         const {id} = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({message: 'Invalid team ID'});
//         }

//         const result = await Team.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({message: 'Team not found'});
//         }

//         res.json({message: 'Team deleted successfully'});
//     } catch (error) {
//         console.error('Error deleting team:', error);
//         res.status(500).json({message: 'Failed to delete team', error});
//     }
// });

// CRUD operations for teams
// app.get('/api/teams', authenticateToken, async (req, res) => {
//     try {
//         const teams = await Team.find({userId: req.user.id}); // Only fetch teams belonging to the authenticated user
//         res.json(teams);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to fetch teams', error});
//     }
// });

// app.post('/api/teams', authenticateToken, async (req, res) => {
//     const {name, drivers, constructors} = req.body;
//     const newTeam = new Team({
//         name,
//         drivers,
//         constructors,
//         userId: req.user.id,
//     }); // Associate the new team with the authenticated user

//     try {
//         await newTeam.save();
//         res.status(201).json(newTeam);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to add team', error});
//     }
// });

app.put('/api/teams/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const {name, drivers, constructors} = req.body;

    try {
        const updatedTeam = await Team.findOneAndUpdate(
            {_id: id, userId: req.user.id}, // Only update teams belonging to the authenticated user
            {name, drivers, constructors},
            {new: true},
        );

        if (!updatedTeam) {
            return res.status(404).json({message: 'Team not found'});
        }

        res.json(updatedTeam);
    } catch (error) {
        res.status(500).json({message: 'Failed to update team', error});
    }
});

app.delete('/api/teams/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTeam = await Team.findOneAndDelete({
            _id: id,
            userId: req.user.id,
        }); // Only delete teams belonging to the authenticated user

        if (!deletedTeam) {
            return res.status(404).json({message: 'Team not found'});
        }

        res.json({message: 'Team deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Failed to delete team', error});
    }
});

// Export the app for testing
module.exports = app;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
