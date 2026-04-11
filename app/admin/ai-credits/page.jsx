"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Zap,
  Search,
  Plus,
  MessageCircle,
  TrendingUp,
  User as UserIcon,
  Mail,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

function AiCreditsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("aiCredits");
  const [sortDir, setSortDir] = useState("desc");
  const [topUpUserId, setTopUpUserId] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState(10);
  const [topUpLoading, setTopUpLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/admin/ai-credits`);
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching AI credits:", error);
      toast.error("Failed to fetch AI credits data");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleTopUp = async (clerkId) => {
    if (topUpAmount <= 0 || topUpAmount > 1000) {
      toast.error("Credits must be between 1 and 1000");
      return;
    }

    try {
      setTopUpLoading(true);
      const res = await axios.put(`${apiUrl}/api/admin/ai-credits`, {
        clerkId,
        credits: topUpAmount,
      });
      toast.success(res.data.message);
      setTopUpUserId(null);
      setTopUpAmount(10);
      fetchUsers();
    } catch (error) {
      console.error("Error topping up credits:", error);
      toast.error("Failed to add credits");
    } finally {
      setTopUpLoading(false);
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filteredUsers = users
    .filter((u) => {
      const q = search.toLowerCase();
      return (
        u.firstName?.toLowerCase().includes(q) ||
        u.lastName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let aVal, bVal;
      if (sortField === "aiCredits") {
        aVal = a.aiCredits || 0;
        bVal = b.aiCredits || 0;
      } else if (sortField === "totalUsed") {
        aVal = a.usage?.totalUsed || 0;
        bVal = b.usage?.totalUsed || 0;
      } else if (sortField === "name") {
        aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
        bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });

  // Stats
  const totalCreditsOut = users.reduce((s, u) => s + (u.aiCredits || 0), 0);
  const totalUsed = users.reduce((s, u) => s + (u.usage?.totalUsed || 0), 0);
  const totalConvos = users.reduce(
    (s, u) => s + (u.usage?.conversationCount || 0),
    0
  );

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <ChevronUp size={12} className="text-slate-300" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} className="text-white" />
    ) : (
      <ChevronDown size={12} className="text-white" />
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={20} className="text-amber-500" />
          <h1 className="text-xl font-bold text-slate-800">AI Credits</h1>
        </div>
        <p className="text-xs text-slate-500">
          Manage student AI tutor credit balances and monitor usage
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Zap size={13} className="text-amber-500" />
            <span className="font-semibold uppercase tracking-wider">
              Credits Available
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalCreditsOut}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <TrendingUp size={13} className="text-blue-500" />
            <span className="font-semibold uppercase tracking-wider">
              Credits Used
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalUsed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <MessageCircle size={13} className="text-green-500" />
            <span className="font-semibold uppercase tracking-wider">
              Conversations
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalConvos}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#090D24]/10 focus:border-[#090D24] transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-7 h-7 border-3 border-slate-200 border-t-[#090D24] rounded-full animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <UserIcon size={28} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th
                    className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer select-none"
                    onClick={() => toggleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Student <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="text-center px-4 py-3 font-semibold text-slate-600 cursor-pointer select-none"
                    onClick={() => toggleSort("aiCredits")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Credits <SortIcon field="aiCredits" />
                    </div>
                  </th>
                  <th
                    className="text-center px-4 py-3 font-semibold text-slate-600 cursor-pointer select-none"
                    onClick={() => toggleSort("totalUsed")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Used <SortIcon field="totalUsed" />
                    </div>
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">
                    Chats
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <React.Fragment key={u.clerkId}>
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#090D24] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {u.firstName?.[0]}
                            {u.lastName?.[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 text-xs truncate">
                              {u.firstName} {u.lastName}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                              <Mail size={9} />
                              {u.email}
                            </p>
                            <p className="text-[9px] text-slate-300 truncate font-mono">
                              {u.clerkId?.slice(-12)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            u.aiCredits > 10
                              ? "bg-green-50 text-green-700 border-green-200"
                              : u.aiCredits > 0
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-red-50 text-red-600 border-red-200"
                          }`}
                        >
                          <Zap size={10} />
                          {u.aiCredits || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs font-medium text-slate-500">
                        {u.usage?.totalUsed || 0}
                      </td>
                      <td className="px-4 py-3 text-center text-xs font-medium text-slate-500">
                        {u.usage?.conversationCount || 0}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setTopUpUserId(
                              topUpUserId === u.clerkId ? null : u.clerkId
                            )
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#090D24] rounded-lg hover:bg-[#1a1f3a] transition-colors"
                        >
                          <Plus size={12} />
                          Top Up
                        </button>
                      </td>
                    </tr>
                    {/* Top-up inline form */}
                    {topUpUserId === u.clerkId && (
                      <tr className="bg-slate-50">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex items-center gap-3 justify-end">
                            <span className="text-xs text-slate-500 font-medium">
                              Add credits to {u.firstName}:
                            </span>
                            <input
                              type="number"
                              min={1}
                              max={1000}
                              value={topUpAmount}
                              onChange={(e) =>
                                setTopUpAmount(parseInt(e.target.value) || 0)
                              }
                              className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#090D24]/10 focus:border-[#090D24]"
                            />
                            <button
                              onClick={() => handleTopUp(u.clerkId)}
                              disabled={topUpLoading}
                              className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              {topUpLoading ? "Adding..." : "Confirm"}
                            </button>
                            <button
                              onClick={() => setTopUpUserId(null)}
                              className="px-3 py-1.5 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiCreditsPage;
