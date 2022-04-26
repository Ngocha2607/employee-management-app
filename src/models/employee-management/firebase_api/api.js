import axios from "axios";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const addEmployeeHandler = async (employeeData) => {
  await axios.post(
    "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees.json",
    {
      employeeData,
    }
  );
};

export const removeEmployeeHandler = async (employeelocation) => {
  await axios.delete(
    `https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees/${employeelocation}.json`
  );
  notification.open({
    message: "Server Feedback",
    description: "Delete successfully!",
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

export const updateEmployeeHandler = async (employeePath, employeeData) => {
  await axios.patch(
    `https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees/${employeePath}.json`,
    {
      employeeData,
    }
  );
  notification.open({
    message: "Server Feedback",
    description: "Update successfully!",
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};
