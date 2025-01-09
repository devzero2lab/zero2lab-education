"use client";
import React from "react";
import axios from "axios";
import { Table, Image, Button } from "antd";
import { toast } from "sonner";

function PendingList({ courses }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Define the columns for the AntD Table
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (_, record) => record.courseId?.courseName || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "WhatsApp Number",
      dataIndex: "whatsappNumber",
      key: "whatsappNumber",
    },
    {
      title: "Access Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payment Slip",
      dataIndex: "paymentSlip",
      key: "paymentSlip",
      render: (paymentSlip) => (
        <Image
          width={50}
          src={paymentSlip}
          alt="Payment Slip"
          preview={{ src: paymentSlip }} // Enable modal preview
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleGrantAccess(record)}>
          Grant Access
        </Button>
      ),
    },
  ];

  // Map the data to match AntD Table structure
  const dataSource = courses.map((course, index) => ({
    key: index,
    ...course, // Spread the course details
  }));

  const handleGrantAccess = async (course) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/usercourses/${course._id}`,
        { status: "Approved" }
      );

      if (response.status === 200) {
        toast.success(
          `Access granted to ${course.firstName} ${course.lastName}.`
        );
      } else {
        toast.error("Failed to grant access");
      }
    } catch (error) {
      console.error("Error granting access:", error);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      pagination={{ pageSize: 5 }}
    />
  );
}

export default PendingList;
