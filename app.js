import express from "express";
import employeesRouter from "./api/employees.js";
const app = express();
export default app;

// TODO: this file!
app.use(express.json());
app.get("/", (_, res) => {
  res.status(200).send("Welcome to the Fullstack Employees API.");
});
app.use("/employees", employeesRouter);
