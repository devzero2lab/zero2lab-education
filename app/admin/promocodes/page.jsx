"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Tag,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Pencil,
  X,
  Check,
  Loader2,
  RefreshCw,
} from "lucide-react";

function StatusBadge({ isActive }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isActive
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-red-100 text-red-600 border-red-200"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-400"}`} />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

export default function PromoCodesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = create mode, object = edit mode
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: "", discountPercent: "", description: "" });
  const [formError, setFormError] = useState("");

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/admin/promocodes`);
      setCodes(res.data.codes || []);
    } catch {
      toast.error("Failed to load promo codes.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const openCreateModal = () => {
    setEditTarget(null);
    setForm({ code: "", discountPercent: "", description: "" });
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (promo) => {
    setEditTarget(promo);
    setForm({
      code: promo.code,
      discountPercent: String(promo.discountPercent),
      description: promo.description || "",
    });
    setFormError("");
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setFormError("");
    const pct = Number(form.discountPercent);
    if (!form.code.trim()) return setFormError("Code is required.");
    if (!form.discountPercent || isNaN(pct) || pct < 1 || pct > 100)
      return setFormError("Discount must be between 1 and 100.");

    setSaving(true);
    try {
      if (editTarget) {
        await axios.put(`${apiUrl}/api/admin/promocodes/${editTarget._id}`, {
          code: form.code.trim().toUpperCase(),
          discountPercent: pct,
          description: form.description.trim(),
        });
        toast.success("Promo code updated.");
      } else {
        await axios.post(`${apiUrl}/api/admin/promocodes`, {
          code: form.code.trim().toUpperCase(),
          discountPercent: pct,
          description: form.description.trim(),
        });
        toast.success("Promo code created.");
      }
      setShowModal(false);
      fetchCodes();
    } catch (err) {
      setFormError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (promo) => {
    try {
      await axios.put(`${apiUrl}/api/admin/promocodes/${promo._id}`, {
        isActive: !promo.isActive,
      });
      toast.success(`Code ${promo.code} ${!promo.isActive ? "activated" : "deactivated"}.`);
      fetchCodes();
    } catch {
      toast.error("Failed to toggle promo code.");
    }
  };

  const handleDelete = async (promo) => {
    const result = await Swal.fire({
      title: "Delete Promo Code?",
      text: `"${promo.code}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${apiUrl}/api/admin/promocodes/${promo._id}`);
      toast.success(`Code "${promo.code}" deleted.`);
      fetchCodes();
    } catch {
      toast.error("Failed to delete promo code.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#090D24] flex items-center justify-center shrink-0">
            <Tag size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">Promo Codes</h1>
            <p className="text-xs text-slate-500">{codes.length} code{codes.length !== 1 ? "s" : ""} configured</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCodes}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#090D24] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            <Plus size={15} />
            New Code
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-slate-400" />
          </div>
        ) : codes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
            <Tag size={32} className="text-slate-300" />
            <p className="text-sm font-medium">No promo codes yet. Create one above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Discount</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Used</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {codes.map((promo) => (
                  <tr key={promo._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-[#090D24] bg-slate-100 px-2.5 py-1 rounded-lg text-sm tracking-widest">
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-700">{promo.discountPercent}%</span>
                      <span className="text-slate-400 text-xs ml-1">off</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs max-w-[180px] truncate">
                      {promo.description || <span className="italic text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge isActive={promo.isActive} />
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-slate-600 font-semibold">{promo.usageCount}</span>
                      <span className="text-slate-400 text-xs ml-1">times</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Toggle */}
                        <button
                          onClick={() => handleToggle(promo)}
                          title={promo.isActive ? "Deactivate" : "Activate"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            promo.isActive
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-500 hover:bg-red-50"
                          }`}
                        >
                          {promo.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => openEditModal(promo)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(promo)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                {editTarget ? "Edit Promo Code" : "Create Promo Code"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Code <span className="text-red-500">*</span></label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleFormChange}
                  placeholder="e.g. SAVE20"
                  maxLength={20}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-mono uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#090D24]/20 focus:border-[#090D24] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Discount % <span className="text-red-500">*</span></label>
                <input
                  name="discountPercent"
                  type="number"
                  value={form.discountPercent}
                  onChange={handleFormChange}
                  placeholder="e.g. 15"
                  min={1}
                  max={100}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#090D24]/20 focus:border-[#090D24] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Description <span className="text-slate-400 font-normal">(optional)</span></label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="e.g. New student discount"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#090D24]/20 focus:border-[#090D24] transition-all"
                />
              </div>

              {formError && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1.5">
                  <X size={13} className="shrink-0" />
                  {formError}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#090D24] hover:bg-slate-800 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Check size={15} />
                )}
                {editTarget ? "Save Changes" : "Create Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
