const router = require('express').Router();
const {studentRegister,students,uniquestudent,updatedata} = require("../controllers/Student-register")
const {jwtAuthMiddleware, generateToken} = require("../middlewere/jwt")


router.post('/studentReg', studentRegister);


//filter , pagination api
router.post('/students', students);
// /students route pagination url "http://localhost:5000/student/students?page=1&limit=3"



// everytime unique student get
router.get('/uniquestudents', uniquestudent);



// edit api
router.post('/api/data',updatedata);




module.exports = router;

