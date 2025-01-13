"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const UsersPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotEnrolledUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        setData(response.data.notEnrolledUsers);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchNotEnrolledUsers();
  }, []);

  // Define table columns
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="mb-4 text-2xl font-bold">Not Enrolled Users</p>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UsersPage;
