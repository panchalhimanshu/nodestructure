const bcrypt = require('bcrypt');
const studentSchema = require('../models/Student-registers')
const {jwtAuthMiddleware, generateToken} = require("../middlewere/jwt")


const studentRegister = async (req, res) => {
    try {
            const student = new studentSchema(req.body);
       
            let response = await student.save();
                 const payload = {
                id: response.id,
                name:response.name
            }
            const token = generateToken(payload);

            res.status(200).json({response: response, token: token});
    } catch (err) {
        res.status(500).json(err);
    }
};


// const students = async (req, res) => {
//     try {
//         const { name, email } = req.body;

//         let query = {};

//         if (name) {
//             query.name = name;
//         }

//         if (email) {
//             query.email = email;
//         }

//         const students = await studentSchema.find(query);

//         if (students.length > 0) {
//             res.status(200).json(students);
//         } else {
//             res.status(404).json("not found");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };


const students = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { page = 1, limit = 10 } = req.query; // Default values: page 1, 10 results per page
        
        let query = {};
        // if (name) {
        //     query.name = name;
        // }
        // if (email) {
        //     query.email = email;                
        // }
        
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match
        }
        if (email) {
            query.email =  { $regex: email, $options: 'i' };
        }

        const students = await studentSchema.find(query)
            .limit(limit * 1) // Convert `limit` to a number
            .skip((page - 1) * limit)
            .exec();

        const count = await studentSchema.countDocuments(query);

        res.status(200).json({
            students,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json(err);
    }
};


const uniquestudent = async (req, res) => {
    try {
        
        const students = await studentSchema.aggregate([
            { $sample: { size: 2 } },
            { $project: { _id: 1, name: 1, email: 1 } }
        ]);

        res.status(200).json({students})

    } catch (err) {
        res.status(500).json(err);
    }
};

const updatedata = async (req, res) => {
    const { id, name, email } = req.body;
    try {
        const updatedData = await studentSchema.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedData) {
            return res.status(404).send({ error: 'Data not found' });
        }
        res.status(200).send({ message: 'Data updated', data: updatedData });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the data' });
    }
}



module.exports = {studentRegister,students,uniquestudent,updatedata}