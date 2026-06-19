import httpError from "../middleware/httpError.js";
import Employee from "../model/model.js";

const add = async (req, res, next) => {
    
    try {

        const { name, emp_Id, PhoneNumber, salary, email } = req.body;

        const NewEmployee = new Employee({ name, emp_Id, PhoneNumber, salary, email });

        await NewEmployee.save();

        res.status(201).json({ success: true, message: "Employee added", NewEmployee })

    } catch (error) {

        next(new httpError(error.message, 500));

    }
};

const getAllEmployee = async (req, res, next) => {

    try {

        const AllEmployee = await Employee.find()

        if (AllEmployee.length <= 0) {
            res.status(404).json({ success: true, message: "employee data is not found" });
        }
        res.status(200).json({ success: true, message: "employee data is found", AllEmployee });

    } catch (error) {
        next(new httpError(error.message, 500))

    }
};

const employeeByID = async (req, res, next) => {

    try {
        const { id } = req.params;

        const employeeData = await Employee.findById(id);

        if (!employeeData) {
            return next(new httpError("Employee data is not found with this id", 404))
        }

        res.status(200).json({ message: "Employee found", employeeData })
    } catch (error) {

        next(new httpError(error.message, 500))

    }

};


const deleteById = async (req, res, next) => {

    try {
        const { id } = req.params;

        const employeeDeleteByID = await Employee.findByIdAndDelete(id);

        if (!employeeData) {
            return next(new httpError("Employee data is not found with this id", 404))
        }

        res.status(200).json({ message: "Employee found", employeeDeleteByID })
    } catch (error) {

        next(new httpError(error.message, 500))

    }

};

const deleleAllData = async (req, res, next) => {

    try {
        const { id } = req.params;

        const employeeDelete = await Employee.deleteMany(id);

        if (!employeeDelete) {
            return next(new httpError("Employee data is not found", 500))
        }

        res.status(200).json({ message: "Deleted Successfully", employeeDelete })
    } catch (error) {

        next(new httpError(error.message, 500))

    }

};


const updateById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const empUpdateById = await Employee.findByIdAndUpdate(id, req.body, { new: true });

        if (!empUpdateById) {
            return next(new httpError("data is not found", 404))
        }

        res.status(200).json({ message: "update successfully", empUpdateById })

    } catch (error) {

        next(new httpError(error.message))

    }

}

const updateManually = async (req, res, next) => {

    try {

        const { id } = req.params;

        const employeeData = await Employee.findById(id);

        if (!employeeData) {
            return next(new httpError("data is not found with this id", 404));
        }
        const updates = Object.keys(req.body);

        const allowedFiled = ["name", "emil", "PhoneNumber"];

        const isValidUpdate = updates.every((u) => allowedFiled.includes(u));

        if (!isValidUpdate) {
            return next(new httpError("only allow field can be update", 400));

        }

        updates.forEach((update) => (employeeData[update] = req.body[update]));

        await employeeData.save();

        res.status(200).json({ success: true, message: "updated successfully", employeeData })
    }

    catch (error) {

        next(new httpError(error.message))

    }


}


export default { add, getAllEmployee, employeeByID, deleteById, deleleAllData, updateById, updateManually };