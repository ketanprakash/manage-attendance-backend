const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.status(200).send("<h1>Home page</h1>");
})

app.listen(port, () => {
    console.log("Server started on port", port);
})