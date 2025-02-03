import React from "react";
import { Table, Image, Button } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "sonner";

function CompletedList({ courses, fetchCompletedCourses }) {
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleIncomplete(record)}
          className="font-semibold text-white "
        >
          Incomplete
        </Button>
      ),
    },
  ];

  // Map the data to match AntD Table structure
  const dataSource = courses.map((course, index) => ({
    key: index,
    ...course, // Spread the course details
  }));

  const handleIncomplete = async (course) => {
    // Show confirmation dialog before performing the update
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark ${course.firstName} ${course.lastName} as a incompleted?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Incomplete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${apiUrl}/api/usercourses/${course._id}`,
          { status: "Approved" }
        );

        if (response.status === 200) {
          toast.success(
            `Course incompleted for ${course.firstName} ${course.lastName}.`
          );
          fetchCompletedCourses();
        } else {
          toast.error("Failed to mark as incompleted");
        }
      } catch (error) {
        console.error("Error Incompleting:", error);
      }
    }
  };

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
