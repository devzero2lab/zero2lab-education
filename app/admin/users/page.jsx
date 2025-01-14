"use client";
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";

const UsersPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotEnrolledUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        console.log("API Response:", response.data);
        setData(response.data.notEnrolledUsers);
      } catch (err) {
        console.error("Fetch Error:", err);
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => handleDelete(record)}
          className="font-semibold text-white bg-red-500 border-red-500 hover:bg-red-600"
        >
          Delete
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (record) => {
    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete user ${record.email} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiUrl}/api/users/${record._id}`);
        toast.success(`User ${record.email} deleted successfully.`);
        setData((prevData) =>
          prevData.filter((user) => user._id !== record._id)
        );
      } catch (error) {
        toast.error(`Failed to delete user ${record.email}.`);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the user.",
          "error"
        );
      }
    }
  };

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
