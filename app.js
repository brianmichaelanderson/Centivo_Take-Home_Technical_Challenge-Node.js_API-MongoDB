const express = require('express');

const app = express();
app.use(express.json());


//Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler caught: ', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message || 'Something went wrong'});
})

module.exports = app;