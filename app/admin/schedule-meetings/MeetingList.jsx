"use client";
import React from "react";
import { Table, Button } from "antd";
import Swal from "sweetalert2";
import { toast } from "sonner";
import axios from "axios";

function MeetingList({ meetings, fetchMeetings }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const deleteMeeting = async (id) => {
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
          await axios.delete(`${apiUrl}/api/meetings/${id}`);
          toast.success("Meeting deleted successfully!");
          fetchMeetings();
        } catch (error) {
          console.error("Failed to delete meeting:", error);
          toast.error("Failed to delete meeting.");
        }
      }
    });
  };

  // Define table columns
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
          onClick={() => deleteMeeting(record._id)}
          className="font-semibold text-white bg-red-500 border-red-500 hover:bg-red-600"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={meetings}
      columns={columns}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 5 }}
      footer={() => <div>{`Total ${meetings.length} meetings`}</div>}
      locale={{
        emptyText: "No Meetings",
      }}
      loading={false}
    />
  );
}

export default MeetingList;
