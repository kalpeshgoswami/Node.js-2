import httpError from "../middleware/httpError.js";
import Student from "../model/model.js";

const add = async (req, res, next) => {
    try {

        const { name, grID, Email, course, PhoneNumber } = req.body;

        const NewStudent = new Student({
            name,
            grID,
            Email,
            course,
            PhoneNumber
        });

        await NewStudent.save();

        res.status(201).json({
            success: true,
            message: "student added",
            NewStudent
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
}

const AllStudent = async (req, res, next) => {
    try {
        const AllStudentsData = await Student.find();

        if (AllStudentsData.length <= 0) {
            res.status(200).json({ success: true, message: "student data is not found" });
        }

        res
            .status(200)
            .json({
                success: true,
                message: "student data found",
                total: AllStudentsData.length,
                AllStudentsData,
            });
    }
    catch (error) {
        next(new httpError(error.message, 500))
    }
}


const studentById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const studentData = await Student.findById(id);

        if (!studentData) {
            return next(new httpError("student not found with this id", 404))
        }

        res.status(200).json({ message: "student found", studentData })

    } catch (error) {

        next(new httpError(error.message, 500))

    }

}

const deleteById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const studentData = await Student.findByIdAndDelete(id);

        if (!studentData) {
            return next(new httpError("student not found with this id", 404))
        }

        res.status(200).json({ message: "student Deleted successfully" })

    } catch (error) {

        next(new httpError(error.message, 500))
    }
}


const updateById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const studentData = await Student.findByIdAndUpdate(id, req.body, { new: true });

        if (!studentData) {
            return next(new httpError("student not found with this id", 404))
        }

        res.status(200).json({ message: "student Update successfully", studentData })

    } catch (error) {

        next(new httpError(error.message, 500))
    }
}


export default { add, AllStudent, studentById, deleteById, updateById };