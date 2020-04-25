const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const memberRoute = require('./routes/member');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});

connectDB();


const app = express();
app.use(cors());

app.use(express.json());


app.use('/api/member', memberRoute);

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold));
