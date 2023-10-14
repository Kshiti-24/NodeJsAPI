const express = require("express");
const Student = require("../models/students");
const router = new express.Router();

// router.get("/" , (req,res) => {
//     res.send("Hello from the other side by kshitiz");
// })

/*
router.post("/students", (req,res) => {

    console.log(req.body);
    const user = new Student(req.body);
    user.save().then( () => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })

    // res.send("Hello from the other side by kshitiz");
})
*/

router.post("/students", async (req,res) => {
    try{
        console.log(req.body);
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
})


router.get("/students", async (req,res) =>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.send(e);
    }
});

router.get("/students/:id", async (req,res) =>{
    try{
        const _id = req.params.id;
        // console.log(req.params.id);
        const studentData = await Student.findById(_id);
        if(!studentData){
            return res.status(404).send();
        }
        else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
});

router.patch("/students/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudent);
    }catch(e){
        res.status(400).send(e);
    }
});

router.delete("/students/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!_id){
            return res.status(404).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;
