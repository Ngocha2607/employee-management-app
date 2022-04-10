 
export const addEmployeeHandler = async (employeeData) => {
      await fetch(
        "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees.json",
        {
          method: "POST",
          body: JSON.stringify(employeeData),
        }
      );
    };
  
export const removeEmployeeHandler = async (employeelocation) => {
    await fetch(
      "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees/" + `${employeelocation}` + ".json",
      {
        method: "DELETE",
        body: JSON.stringify(),
      }
    );
    alert("Delete successfully!");
  };
  
export const updateEmployeeHandler = async (employeePath, employeeData) => {
    await fetch(
      "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees/" + `${employeePath}` + ".json",
      {
        method: "PATCH",
        body: JSON.stringify(employeeData ),
      }
    );
    alert("Update successfully!");
  };
  