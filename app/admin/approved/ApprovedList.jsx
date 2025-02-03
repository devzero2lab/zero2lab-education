import React from "react";
import axios from "axios";
import { Table, Image, Button } from "antd";
import { toast } from "sonner";
import Swal from "sweetalert2";

function ApprovedList({ courses, fetchApprovedCourses }) {
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
        <div className="flex space-x-2">
          <Button
            type="danger"
            onClick={() => handleDenyAccess(record)}
            className="font-semibold text-white bg-red-500 border-red-500 hover:bg-red-600"
          >
            Deny
          </Button>
          <Button
            type="primary"
            onClick={() => handleComplete(record)}
            className="font-semibold text-white "
          >
            Complete
          </Button>
        </div>
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
        fetchApprovedCourses();
      } else {
        toast.error("Failed to Deny access");
      }
    } catch (error) {
      console.error("Error Deny:", error);
    }
  };

  const handleComplete = async (course) => {
    // Show confirmation dialog before performing the update
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark ${course.firstName} ${course.lastName}as a completed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Complete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${apiUrl}/api/usercourses/${course._id}`,
          { status: "Completed" }
        );

        if (response.status === 200) {
          toast.success(
            `Course completed for ${course.firstName} ${course.lastName}.`
          );
          fetchApprovedCourses();
        } else {
          toast.error("Failed to mark as completed");
        }
      } catch (error) {
        console.error("Error Completing:", error);
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
        emptyText: "No Approved Records",
      }}
      loading={false}
    />
  );
}

export default ApprovedList;
