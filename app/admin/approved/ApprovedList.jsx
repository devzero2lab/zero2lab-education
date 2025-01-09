"use client";
import React from "react";
import axios from "axios";
import { Table, Image, Button } from "antd";
import { toast } from "sonner";

function ApprovedList({ courses }) {
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
        <Button type="primary" onClick={() => handleDenyAccess(record)}>
          Access Deny
        </Button>
      ),
    },
  ];

  // Map the data to match AntD Table structure
  const dataSource = courses.map((course, index) => ({
    key: index,
    ...course, // Spread the course details
  }));

  const handleDenyAccess = async (course) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/usercourses/${course._id}`,
        { status: "Pending" }
      );

      if (response.status === 200) {
        toast.success(`Access Deny to ${course.firstName} ${course.lastName}.`);
      } else {
        toast.error("Failed to Deny access");
      }
    } catch (error) {
      console.error("Error Deny:", error);
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

export default ApprovedList;
