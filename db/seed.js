import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

async function seedEmployees() {
  const employees = [];
  for (let i = 0; i < 10; i++) {
    employees.push({
      name: faker.person.fullName(),
      birthday: faker.date.past({ years: 30 }),
      salary: faker.number.int({ min: 30000, max: 150000 }),
    });
    try {
      await createEmployee(employees[i]);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  }
}

try{
  await db.connect();
  await seedEmployees();
  await db.end();
  console.log("🌱 Database seeded.");
} catch (error) {
  console.error("Error seeding database:", error);
}

