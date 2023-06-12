const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()

const employeeRoutes = require('./routes/employeeRoutes')
// middleware
app.use(bodyParser.json())

app.use('/employee', employeeRoutes)

app.use((req, res, next) => {
    res.send("<h1>Page Not found<h1/>")
})
mongoose.connect('mongodb+srv://salman:XJ0fFNbROVRE610s@cluster0.qijjvid.mongodb.net/employees?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000, () => console.log("using 3000..."))
})
.catch(err => console.log(err))
