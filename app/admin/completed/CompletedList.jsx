import React from "react";
import { Table, Image } from "antd";

function CompletedList({ courses }) {
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
      render: (paymentSlip) =>
        paymentSlip.startsWith("http") ? (
          <Image
            width={50}
            src={paymentSlip}
            alt="Payment Slip"
            preview={{ src: paymentSlip }} // Enable modal preview
          />
        ) : (
          <span className="font-semibold text-gray-600">{paymentSlip}</span>
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
      footer={() => <div>{`Total ${courses.length} Users`}</div>}
      locale={{
        emptyText: "No Completed Records",
      }}
      loading={false}
    />
  );
}

export default CompletedList;
