import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

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
    notification.open({
      message: "Server Feedback",
      description: "Delete successfully!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  
export const updateEmployeeHandler = async (employeePath, employeeData) => {
    await fetch(
      "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees/" + `${employeePath}` + ".json",
      {
        method: "PATCH",
        body: JSON.stringify(employeeData ),
      }
    );
    notification.open({
      message: "Server Feedback",
      description: "Update successfully!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  