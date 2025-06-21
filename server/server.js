const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./config/db');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

db();

const PORT = 8080;
const host = 'localhost';
const USER_ROUTES = require('./routes/UserRoutes');
const MOVIE_ROUTES = require('./routes/MovieRoutes');
const THEATRE_ROUTES = require('./routes/TheatreRoutes');

app.use('/api/users', USER_ROUTES);
app.use('/api/movies', MOVIE_ROUTES);
app.use('/api/theatres', THEATRE_ROUTES);


app.listen(PORT, host, () => {
    console.log(`Server is running at http://${host}:${PORT}`);
});;