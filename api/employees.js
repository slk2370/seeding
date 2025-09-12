import express from "express";
import {
  getEmployees,
  createEmployee,
  getListOfIds,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "../db/queries/employees.js";
const router = express.Router();
export default router;

router
  .route("/")
  .get(async (_, res) => {
    const employeesList = await getEmployees();
    res.status(200).send(employeesList);
  })
  .post(async (req, res) => {
    if (!req.body) {
      return res.status(400).send("Bad Request");
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).send("Bad Request");
    }
    const newEmployee = await createEmployee({ name, birthday, salary });
    return res.status(201).send(newEmployee);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    if (id !== Number(id).toString()) {
      return res.status(400).send("Bad Request");
    }

    if (Number(id) < 1) {
      return res.status(404).send("Not Found");
    }

    const ids = await getListOfIds();
    if (!ids.includes(parseInt(id))) return res.status(404).send("Not Found");

    const employee = await getEmployee(id);
    return res.status(200).send(employee);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (id !== Number(id).toString()) {
      return res.status(400).send("Bad Request");
    }

    if (Number(id) < 1) {
      return res.status(404).send("Not Found");
    }

    const ids = await getListOfIds();
    if (!ids.includes(parseInt(id))) return res.status(404).send("Not Found");

    const deletedEmployee = await deleteEmployee(id);
    return res.status(204).send(deletedEmployee);
  })
  .put(async (req, res) => {
    if (!req.body) return res.status(400).send("Bad Request");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).send("Bad Request");
    }

    const { id } = req.params;
    if (id !== Number(id).toString()) {
      return res.status(400).send("Bad Request");
    }

    if (Number(id) < 1) {
      return res.status(404).send("Not Found");
    }

    const ids = await getListOfIds();
    if (!ids.includes(parseInt(id))) return res.status(404).send("Not Found");

    const updatedEmployee = await updateEmployee({
      id,
      name,
      birthday,
      salary,
    });
    return res.status(200).send(updatedEmployee);
  });
