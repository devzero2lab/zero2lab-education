"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackList from "./FeedbackList";
import { Spin } from "antd";

function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/contactus`);
      setFeedbacks(response.data.feedbackList);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [apiUrl]);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Feedbacks</h1>
      <Spin spinning={loading}>
        <FeedbackList feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} />
      </Spin>
    </div>
  );
}

export default page;
