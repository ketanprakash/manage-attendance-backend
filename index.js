require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const auth = require('./routes/auth');
const subjects = require('./routes/subjects')
const logger = require('./middlewares/logger');
//all json data is parsed on arrival
app.use(express.json());
app.use(logger);

// app.get('/', (req, res) => {
//     res.status(200).send("<h1>Home page</h1>");
// })

app.use('/auth', auth);
app.use('/subjects', subjects);
//creating server
app.listen(port, () => {
    console.log("Server started on port", port);
})