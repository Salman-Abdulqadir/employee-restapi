const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee')

router.get('/get-all', (req, res, next) => {
    Employee.find()
    .then(result => {
        res.json(result)
    })
    .catch(err => console.log(err))
})

router.post('/add-employee', (req, res, next) => {
    const name = req.body.name
    const age = parseInt(req.body.age)
    console.log(name)
    const employee = new Employee({
        name, 
        age
    })
    employee.save().then(result => res.json("employee created successfully!!")).catch(err => console.log(err))
    
})

module.exports = router;