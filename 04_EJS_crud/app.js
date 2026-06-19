import express from "express"

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let studentList = [{
    id: 1,
    name: "Rudra"
}, {
    id: 2,
    name: "krishna"
}];

app.get("/", (req, res) => {
    res.render("index", { studentList })
});

app.get("/add", (req, res) => {

    res.render("add")
})

app.post("/add", (req, res) => {

    const { name } = req.body;

    const newStudent = {
        id: new Date().getTime(),
        name
    };

    studentList.push(newStudent);

    res.redirect("/");

});

app.get("/edit/:id", (req, res) => {

    const id = req.params.id;

    console.log("id", id);

    const student = studentList.find(s => s.id === Number(id));

    if (!student) {
        return res.send("student not found");
    }

    res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;

    const student = studentList.find(s => s.id === Number(id));

    if (!student) {
        return res.send("student not found");
    }

    student.name = req.body.name;

    res.redirect("/");
});


app.get("/delete/:id", (req, res) => {
    const id = req.params.id

    console.log("id", id)

    studentList = studentList.filter(s => s.id !== Number(id));

    res.redirect("/");
});



const port = 5000;

app.listen(port, (err) => {
    if (err) {
        console.log("error");
    }
    console.log(`This Page is Loading..${port}`);
});