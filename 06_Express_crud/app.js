import express from "express";
import HttpError from "./middleware/HttpError.js";


const TaskList = [
    { id: 1, task: "learn", description: "you have to learn new things daily" },
    { id: 2, task: "practice", description: "you have to practice daily" },
]


const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json("hello from server");
});


// --- Read ---


app.get("/TaskList", (req, res, next) => {

    if (TaskList.length === 0) {
        return res
            .status(200)
            .json({ success: true, message: "no task data available" });
    }

    res.status(200).json({
        success: true,
        message: "task data fetched successfully",
        TaskList,
    });

});

app.get("/task/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const task = TaskList.find((t) => t.id === id);

    if (!task) {
        return res
            .status(404)
            .json({ success: false, message: "no task data found with this id" });
    }

    res.status(200).json({ success: true, message: "task found", task });
});

// --- create ---


app.post("/addTask", (req, res, next) => {

    const { task, description } = req.body;

    if (!task || !description) {

        return next(new HttpError("task or description data are required", 400));

    }


    const newTask = {
        id: new Date().getTime(),
        task,
        description,
    };

    TaskList.push(newTask);

    res.status(201).json({ success: true, message: "new Task added successfully", newTask })

})


// update using patch partially update only user defined field from body  will be update or rest will remain as it is

app.patch("/updateTask/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const taskData = TaskList.find((t) => t.id === id);

    if (!taskData) {
        return next(new HttpError("task not found with this id for update", 404));
    }
    const { task, description } = req.body;

    if (task) {
        taskData.task = task;
    }

    if (description) {
        taskData.description = description;
    }

    if (!task || !description) {
        return next(new HttpError("task or description data is required", 400));
    }

    res.status(200).json({
        success: true,
        message: "task data updated successfully",
        taskData,
    });
});

// ---- PUT Method ----

// app.put("updateTask/:id", (req, res, next) => {

//     const id = Number(req.params.id);

//     const taskDataIndex = TaskList.findIndex((t) => t.id === id);

//     if (taskDataIndex === -1) {
//         return next(new HttpError("task data with this id not found", 404));
//     }

//     const { task, description } = req.body;

//     TaskList[taskDataIndex] = { ...TaskList[taskDataIndex], task, description };

//     res.status(200).json({

//         success: true,
//         message: "Task Data Update successfully",
//         update: TaskList[taskDataIndex],

//     });

// });

app.delete("/deleteTask/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const index = TaskList.findLastIndex((t) => t.id === id);

    if (index === -1) {
        return next(new HttpError("index is not found", 404));
    }
    TaskList.splice(index, 1)

    res.status(200).json({
        success: true,
        message: "delete successfully"
    })
});



app.use((req, res, next) => {
    return next(new HttpError("request route not fount", 404));
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({ message: error.message || "something went wrong please try again later" });

})



const port = 5000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log(`server running on port ${port}`);
});