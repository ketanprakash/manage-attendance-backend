require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const auth = require('./routes/auth');
const subjects = require('./routes/subjects');
const attendance = require('./routes/attendance');
const timetable = require('./routes/timetable')
const logger = require('./middlewares/logger');
app.use(cors());
//all json data is parsed on arrival
app.use(express.json());
app.use(logger);

// app.get('/', (req, res) => {
//     res.status(200).send("<h1>Home page</h1>");
// })

app.use('/auth', auth);
app.use('/subjects', subjects);
app.use('/attendance', attendance);
app.use('/timetable', timetable);

app.all('*', (req, res) => {
    res.status(404).json({
        message: "Requested data not found"
    })
})

//creating server
app.listen(port, () => {
    console.log("Server started on port", port);
})