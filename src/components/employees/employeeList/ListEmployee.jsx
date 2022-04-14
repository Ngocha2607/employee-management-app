import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  replaceData,
  removeEmployeeFromList,
} from "../../../store/reducers/employee-slice";
import UpdateEmployee from "../../../pages/UpdateEmployee";

import { Card, Table, Space, Button, Modal } from "antd";

const { Column } = Table;

const ListEmployee = () => {
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  const [getUserToken, setGetUserToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const [showUpdate, setShowUpdate] = useState(false);

  const removeEmployeeHandler = () => {
    dispatch(removeEmployeeFromList(getUserToken));
  };
  const showUpdateHandler = () => {
    setShowUpdate(true);
  };

  const cancelUpdateHandler = () => {
    setShowUpdate(false);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedEmployees = [];

      for (const key in responseData) {
        loadedEmployees.push({
          userKey: key,
          id: responseData[key].id,
          name: responseData[key].name,
          phone: responseData[key].phone,
          dob: responseData[key].dob,
          email: responseData[key].email,
        });
      }
      dispatch(replaceData(loadedEmployees));
      setIsLoading(false);
    };
    fetchEmployees().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Card style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Loading...
      </Card>
    );
  }

  if (httpError) {
    return (
      <Card
        title="Server Feedback"
        style={{ textAlign: "center", fontSize: "1.5rem", color: "red" }}
      >
        {httpError}
      </Card>
    );
  }

  const data = employees;

  /* Same as onRow onHeaderRow onCell onHeaderCell */
  return (
    <>
    <Table dataSource={data} rowKey={(record) => record.userKey} style={{ padding: "0 20px" }}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Phone" dataIndex="phone" key="phone" />
      <Column title="BirthDate" dataIndex="dob" key="dob" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Action"
        key="action"
        onCell={(record) => {
          return {
            onClick: (event) => {
              setGetUserToken(record.userKey);
            }, // click row
          };
        }}
        render={(text, record) => (
          <Space size="middle">
            <Button
              type="primary"
              shape="round"
              size="medium"
              onClick={showUpdateHandler}
            >
              Update
            </Button>
            <Button
              type="danger"
              shape="round"
              size="medium"
              onClick={removeEmployeeHandler}
            >
              Delete
            </Button>
          </Space>
        )}
      />
    </Table>
          {showUpdate && (
            <Modal visible={true} footer={null} onCancel={cancelUpdateHandler}>
              <UpdateEmployee
                userKey={getUserToken}
                onCancel={cancelUpdateHandler}
                setShowUpdate={setShowUpdate}
              />
            </Modal>
          )}
          </>
  );
};

export default ListEmployee;
