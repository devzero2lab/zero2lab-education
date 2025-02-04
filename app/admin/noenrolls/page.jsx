"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import axios from "axios";

function NotEnrolls() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Columns for Ant Design table
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchNotEnrolledUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/notenrollusers`);
        setData(response.data.unenrolledUsers || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotEnrolledUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Not Enrolled Users</h1>

      {loading ? (
        <div className="flex justify-center">
          <Spin tip="Loading users..." />
        </div>
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : (
        <Table
          dataSource={data.map((user) => ({
            key: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }))}
          columns={columns}
          pagination={{ pageSize: 5 }}
          footer={() => <div>{`Total ${data.length} Users`}</div>}
          locale={{
            emptyText: "No Enrolled Users",
          }}
        />
      )}
    </div>
  );
}

export default NotEnrolls;
