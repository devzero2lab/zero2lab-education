"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserX, Mail, User } from "lucide-react";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 10;

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function NotEnrolls() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNotEnrolledUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/notenrollusers`);
        setData(response.data.unenrolledUsers || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotEnrolledUsers();
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center">
          <UserX size={18} className="text-slate-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Not Enrolled Users</h1>
          <p className="text-xs text-slate-500">
            {!loading && `${data.length} users without any enrollment`}
          </p>
        </div>
      </div>

      {loading ? (
        <ListSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          Error: {error}
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-slate-100">
          <UserX size={32} className="text-slate-300 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">All users are enrolled! 🎉</p>
        </div>
      ) : (
        <div>
          <div className="space-y-2">
            {paginated.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3 flex items-center gap-3 hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Mail size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-500 truncate">{user.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}

export default NotEnrolls;
