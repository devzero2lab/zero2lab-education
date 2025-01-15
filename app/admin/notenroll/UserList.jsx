"use client";
import React from "react";
import { Table, Button } from "antd";
import Swal from "sweetalert2";
import { toast } from "sonner";
import axios from "axios";

function UserList({ data, loading, fetchNotEnrolledUsers }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleDelete = async (userId, email) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete user ${email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Start loading
        const response = await axios.delete(`${apiUrl}/api/users/${userId}`);
        if (response.status === 200) {
          toast.success(`User ${email} deleted successfully`);
          await fetchNotEnrolledUsers();
        } else {
          toast.error("Failed to delete user");
        }
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(
        error.response?.data?.message || `Failed to delete user ${email}`
      );
    }
  };

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
          onClick={() => handleDelete(record._id, record.email)}
          className="font-semibold text-white bg-red-500 border-red-500 hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="_id"
      loading={loading}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        showTotal: (total) => `Total ${total} users`,
      }}
      locale={{
        emptyText: "No users found",
      }}
    />
  );
}

export default UserList;
