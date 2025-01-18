"use client";
import React from "react";
import { Table, Button } from "antd";
import Swal from "sweetalert2";
import { toast } from "sonner";
import axios from "axios";

function FeedbackList({ feedbacks, fetchFeedbacks }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const deleteFeedback = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/api/contactus/${id}`);
          toast.success("Feedback deleted successfully!");
          fetchFeedbacks();
        } catch (error) {
          console.error("Failed to delete feedback:", error);
          toast.error("Failed to delete feedback.");
        }
      }
    });
  };

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => deleteFeedback(record._id)}
          className="font-semibold text-white bg-red-500 border-red-500 hover:bg-red-600"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={feedbacks}
      columns={columns}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 5 }}
      locale={{
        emptyText: "No Feedbacks",
      }}
      loading={false}
    />
  );
}

export default FeedbackList;
