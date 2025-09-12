import db from "../client.js";
/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
  try {
    const SQL =
      "INSERT INTO fullstack_employees (name, birthday, salary) VALUES ($1, $2, $3) RETURNING *";
    const result = await db.query(SQL, [name, birthday, salary]);

    const {
      rows: [employee],
    } = result;
    return employee;
  } catch (error) {
    console.error("Error creating employee:", error);
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  try {
    const SQL = "SELECT * FROM fullstack_employees";
    const result = await db.query(SQL);

    return result.rows;
  } catch (error) {
    console.error("Error getting employees:", error);
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  try {
    const SQL = "SELECT * FROM fullstack_employees WHERE id = $1";
    const result = await db.query(SQL, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting employee:", error);
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  try {
    const SQL =
      "UPDATE fullstack_employees SET name = $1, birthday = $2, salary = $3 WHERE id = $4 RETURNING *";
    const result = await db.query(SQL, [name, birthday, salary, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating employee:", error);
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  try {
    const SQL = "DELETE FROM fullstack_employees WHERE id = $1 RETURNING *";
    const result = await db.query(SQL, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
}

export async function getListOfIds() {
  try {
    const SQL = "SELECT id FROM fullstack_employees";
    const result = await db.query(SQL);
    return result.rows.map(row => row.id);
  } catch (error) {
    console.error("Error getting list of employee IDs:", error);
  }
}
