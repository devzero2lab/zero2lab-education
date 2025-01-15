"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";

const UsersPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Memoize fetchNotEnrolledUsers to prevent unnecessary recreations
  const fetchNotEnrolledUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/users`);
      setData(response.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchNotEnrolledUsers();
  }, [fetchNotEnrolledUsers]);

  const handleDelete = async (record) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete user ${record.email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        setLoading(true);
        await axios.delete(`${apiUrl}/api/users/${record._id}`);
        toast.success(`User ${record.email} deleted successfully`);
        await fetchNotEnrolledUsers(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(
        error.response?.data?.message || `Failed to delete user ${record.email}`
      );
    } finally {
      setLoading(false);
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
          onClick={() => handleDelete(record)}
          className="font-semibold text-white bg-red-500 border-red-500 hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <p className="mb-6 text-2xl font-bold">Not Enrolled Users</p>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total: data.length,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} users`,
        }}
        locale={{
          emptyText: "No users found",
        }}
      />
    </div>
  );
};

export default UsersPage;
