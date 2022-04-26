import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  replaceData,
  removeEmployeeFromList,
} from "../../../../store/reducers/employee-slice";
import UpdateEmployee from "../../../../pages/UpdateEmployee";
import axios from "axios";
import { Card, Table, Space, Button, Modal, Popconfirm } from "antd";

const { Column } = Table;

const ListEmployee = () => {
  const employees = useSelector((state) => state.employee.employees);

  const dispatch = useDispatch();
  const [getUserToken, setGetUserToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const [showUpdate, setShowUpdate] = useState(false);

  const showUpdateHandler = () => {
    setShowUpdate(true);
  };

  const cancelUpdateHandler = () => {
    setShowUpdate(false);
  };

  useEffect(() => {
    axios
      .get(
        "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees.json"
      )
      .then((response) => {
        const responseData = response.data;
        const loadedEmployees = [];

        for (const key in responseData) {
          loadedEmployees.push({
            userKey: key,
            id: responseData[key].employeeData.id,
            name: responseData[key].employeeData.name,
            phone: responseData[key].employeeData.phone,
            dob: responseData[key].employeeData.dob,
            email: responseData[key].employeeData.email,
          });
        }
        dispatch(replaceData(loadedEmployees));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Card style={{ textAlign: "center", fontSize: "1.5rem", border: "none" }}>
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
      <Table
        dataSource={data}
        rowKey={(record) => record.id}
        style={{ padding: "0 20px" }}
      >
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
              <Popconfirm
                title="Are you sure to delete this employee?"
                onConfirm={() => {
                  dispatch(removeEmployeeFromList(record.userKey));
                }}
                onCancel={() => {}}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button type="danger" shape="round" size="medium">
                  Delete
                </Button>
              </Popconfirm>
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
