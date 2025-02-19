"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import MeetingList from "./MeetingList";

function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/meetings`);
      setMeetings(response.data.meetingList);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [apiUrl]);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Meetings</h1>
      <Spin spinning={loading}>
        <MeetingList meetings={meetings} fetchMeetings={fetchMeetings} />
      </Spin>
    </div>
  );
}

export default Page;
