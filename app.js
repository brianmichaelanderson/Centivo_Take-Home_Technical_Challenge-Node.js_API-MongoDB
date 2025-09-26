const express = require('express');
const userRouter = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/users', userRouter);

//Global error handler
app.use((err, _req, res, _next) => {
    console.error('Global error handler caught: ', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message || 'Something went wrong'});
})

module.exports = app;