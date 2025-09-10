import db from "../client.js";
/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
  try {
    const result = await db.query(
      "INSERT INTO fullstack_employees (name, birthday, salary) VALUES ($1, $2, $3) RETURNING *",
      [name, birthday, salary]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating employee:", error);
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
}
