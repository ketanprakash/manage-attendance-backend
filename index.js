const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const auth = require('./routes/auth');
//all json data is pared on arrival
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("<h1>Home page</h1>");
    console.log("GET /");
})

app.use('/auth', auth);

//creating server
app.listen(port, () => {
    console.log("Server started on port", port);
})