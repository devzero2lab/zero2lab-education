"use client";
import React from "react";
import { Table, Image } from "antd";

function PendingList({ courses }) {
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
  ];

  // Map the data to match AntD Table structure
  const dataSource = courses.map((course, index) => ({
    key: index,
    ...course, // Spread the course details
  }));

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
