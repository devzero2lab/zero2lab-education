"use client";
import React, { useEffect, useState, useCallback } from "react";
import { TrendingUp, Users, BookOpen, Search, ChevronDown, ChevronUp, Mail } from "lucide-react";
import { Montserrat } from "next/font/google";
import Pagination from "../components/Pagination";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const PAGE_SIZE = 10;

function ProgressBar({ percentage, size = "md" }) {
  const color =
    percentage === 100 ? "#22c55e" : percentage >= 60 ? "#090D24" : "#f59e0b";
  const h = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className={`w-full ${h} bg-gray-100 rounded-full overflow-hidden border border-gray-200`}>
      <div
        className={`${h} rounded-full transition-all duration-700`}
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}

function StudentCard({ student }) {
  const [expanded, setExpanded] = useState(false);
  const overallPercent =
    student.courses.length > 0
      ? Math.round(
          student.courses.reduce((sum, c) => sum + c.percentage, 0) /
            student.courses.length
        )
      : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header row */}
      <div
        className="flex items-center justify-between gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar + name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#090D24] text-[#D9FFA5] text-sm font-bold flex items-center justify-center shrink-0 uppercase">
            {student.firstName?.[0]}{student.lastName?.[0]}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 text-sm truncate">
              {student.firstName} {student.lastName}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Mail size={10} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-400 truncate">{student.email}</span>
            </div>
          </div>
        </div>

        {/* Right: courses count + overall % + chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              <BookOpen size={11} className="text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                {student.courses.length} course{student.courses.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#090D24]">{overallPercent}% avg</span>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </div>

      {/* Expanded: per-course detail */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 divide-y divide-slate-100">
          {student.courses.map((course) => (
            <div key={course.courseId} className="px-4 py-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{course.courseName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.completedCount}/{course.totalLessons} lessons completed
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                    course.percentage === 100
                      ? "bg-green-50 text-green-700 border-green-200"
                      : course.status === "Completed"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }`}>
                    {course.percentage === 100 ? "Finished" : course.status}
                  </span>
                  <span className="text-xs font-bold text-[#090D24]">{course.percentage}%</span>
                </div>
              </div>
              <ProgressBar percentage={course.percentage} size="sm" />

              {/* Completed lesson days */}
              {course.completedLessons.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {[...course.completedLessons].sort((a, b) => a - b).map((day) => (
                    <span
                      key={day}
                      className="text-[10px] font-bold bg-[#D9FFA5] text-[#090D24] border border-[#090D24]/20 px-1.5 py-0.5 rounded-md"
                    >
                      Day {day}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminProgressPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all" | "in_progress" | "done"
  const [page, setPage] = useState(1);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/admin/progress`);
      if (!res.ok) throw new Error("Failed to fetch progress");
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Filter logic
  const filtered = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    if (filterStatus === "done") {
      return s.courses.some((c) => c.percentage === 100);
    }
    if (filterStatus === "in_progress") {
      return s.courses.some((c) => c.percentage > 0 && c.percentage < 100);
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Summary stats
  const totalStudents = students.length;
  const totalCourseEnrollments = students.reduce((sum, s) => sum + s.courses.length, 0);
  const completedEnrollments = students.reduce(
    (sum, s) => sum + s.courses.filter((c) => c.percentage === 100).length,
    0
  );

  return (
    <div className={`${montserrat.className} flex-1 min-h-screen bg-slate-50`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-1">
            <TrendingUp size={22} className="text-[#090D24]" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Student Progress</h1>
          </div>
          <p className="text-sm text-slate-400">
            Overview of all enrolled students and their lesson completion.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total Students", value: totalStudents, icon: <Users size={16} className="text-[#090D24]" /> },
            { label: "Total Enrollments", value: totalCourseEnrollments, icon: <BookOpen size={16} className="text-[#090D24]" /> },
            { label: "Courses Finished", value: completedEnrollments, icon: <TrendingUp size={16} className="text-green-600" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-[#090D24]">{loading ? "–" : stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#090D24]/20 focus:border-[#090D24]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="py-2.5 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#090D24]/20 focus:border-[#090D24]"
          >
            <option value="all">All Students</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Course Finished</option>
          </select>
        </div>

        {/* Student list */}
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#090D24] rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading progress data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-xl border border-slate-100">
            <TrendingUp size={32} className="text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No students found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map((student) => (
              <StudentCard key={student.userId} student={student} />
            ))}
          </div>
        )}

        {!loading && filtered.length > PAGE_SIZE && (
          <div className="mt-4">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}
