import * as csv from "@fast-csv/parse";

interface Employee {
  name: string;
  age: number;
  notificationPreference: string;
  salary: number;
}

export const processCSV = async (
  fileBuffer: any
): Promise<{ status: boolean; content: any }> => {
  const expectedHeaders = ["name", "age", "notificationPreference", "salary"];

  // a counter to know in which row and column is the error occuring
  let rowCounter = 0;

  return new Promise((resolve, reject) => {
    const results: any[] = [];

    csv
      .parseString(fileBuffer.toString(), { headers: true })
      .on("headers", (headers) => {
        const missingHeaders = expectedHeaders.filter(
          (header) => !headers.includes(header)
        );
        if (missingHeaders.length !== 0)
          resolve({
            status: false,
            content: `Invalid headers: ${missingHeaders.join(", ")}`,
          });
      })
      .on("data", (data) => {
        rowCounter++;
        const employee = ValidateEmployee(data, rowCounter);
        if (!employee.isValid)
          resolve({ status: false, content: employee.content });
        results.push(employee.content);
      })
      .on("error", (error) => reject({ status: false, content: error }))
      .on("end", () => resolve({ status: true, content: results }));
  });
};

const ValidateEmployee = (
  data: any,
  rowCounter: number
): { isValid: boolean; content: Employee | string } => {
  if (data.name === "" || data.name.length <= 1) {
    return {
      isValid: false,
      content: `Invalid data in row ${rowCounter}: ${data.name} is not a valid name`,
    };
  }
  if (data.age === "" || !/^\d+$/.test(data.age)) {
    return {
      isValid: false,
      content: `Invalid data in row ${rowCounter}: ${data.age} is not a valid age`,
    };
  }
  if (
    // checking that the string only contains numbers and 1 dot
    data.salary === "" ||
    !(/^[\d.]+$/.test(data.salary) && data.salary.split(".").length <= 2)
  ) {
    return {
      isValid: false,
      content: `Invalid data in row ${rowCounter}: ${data.salary} is not a valid salary`,
    };
  }
  if (
    data.notificationPreference === "" ||
    data.notificationPreference.length <= 1
  ) {
    return {
      isValid: false,
      content: `Invalid data in row ${rowCounter}: ${data.notificationPreference} is not a valid notificatin list`,
    };
  }
  const employee: Employee = {
    name: data.name,
    age: parseInt(data.age),
    salary: parseFloat(data.salary),
    notificationPreference: data.notificationPreference.toString().split(","),
  };
  return { isValid: true, content: employee };
};
