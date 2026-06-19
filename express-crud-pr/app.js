import express from "express";

const app = express();

const student = [
    { id: 1, name: "kalpesh", city: "bvn" },
    { id: 2, name: "ankit", city: "bvn" }
]

app.use(express.json());



app.get("/student", (req, res, next) => {
    if (student.length === 0) {
        return res.status(200).json({ success: true, message: "data is not found" })
    };
    res.status(200).json({ success: true, message: "data is available", student })
});



app.get("/student/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const students = student.find((e) => e.id === id)

    if (!students) {
        res.status(404).json({ success: true, message: "data is not found" })
    };
    res.status(200).json({ success: true, message: "data is available", students })
});



app.get("/addStudent/:id", (req, res, next) => {

    const { name, city } = req.body;

    if (!name || !city) {

        return next(new httpError("Enter student data", 400))
    }

    const newStudent = {
        id: new Date().getTime(),
        name,
        city,
    }

    student.push(newStudent)

    res.status(200).json({ success: true, message: "data is available", newStudent });

});


app.patch("/updateStudent/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const students = student.find((t) => t.id === id);

    if (!students) {
        return next(new HttpError(" id not found", 404));
    }

    const { name, city } = req.body;

    if (name) {

        students.name = name;
    }

    if (city) {

        students.city = city;
    }

    if (!name || !city) {
        return next(new HttpError("id not found", 400));
    }
    res.status(200).json({
        success: true,
        message: "Update succesfully", students,
    });
});



app.delete("/deleteStudent/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const index = student.findIndex((t) => t.id === id);

    if (student === -1) {
        return next(new HttpError("id not found", 404));
    }

    student.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "delete successFully"
    });
});




app.get("/", (req, res) => {
    res.send("this is home page");
});


const port = 5000;

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`server is running on port: ${port}`)
})