"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Save,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  CheckCircle,
  Sparkles,
} from "lucide-react";

// ─── Simple Markdown Renderer ─────────────────────────────────────────────────
function MarkdownPreview({ content }) {
  if (!content) {
    return (
      <p className="text-sm text-slate-400 italic py-4 text-center">
        No content yet. Start typing above.
      </p>
    );
  }

  const lines = content.split("\n");

  return (
    <div className="prose prose-sm max-w-none prose-slate">
      {lines.map((line, i) => {
        // Heading 1
        if (line.startsWith("# ")) {
          return (
            <h2 key={i} className="text-base font-bold text-slate-800 mt-4 mb-2 first:mt-0">
              {line.slice(2)}
            </h2>
          );
        }
        // Heading 2
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="text-sm font-bold text-slate-700 mt-3 mb-1.5">
              {line.slice(3)}
            </h3>
          );
        }
        // Heading 3
        if (line.startsWith("### ")) {
          return (
            <h4 key={i} className="text-sm font-semibold text-slate-600 mt-2 mb-1">
              {line.slice(4)}
            </h4>
          );
        }
        // Bullet list
        if (line.startsWith("- ") || line.startsWith("* ")) {
          const text = line.slice(2);
          return (
            <div key={i} className="flex gap-2 text-sm text-slate-700 ml-2 mb-0.5">
              <span className="text-slate-400 shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
            </div>
          );
        }
        // Numbered list
        const numMatch = line.match(/^(\d+)\.\s/);
        if (numMatch) {
          const text = line.slice(numMatch[0].length);
          return (
            <div key={i} className="flex gap-2 text-sm text-slate-700 ml-2 mb-0.5">
              <span className="text-slate-400 shrink-0 font-mono text-xs">{numMatch[1]}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
            </div>
          );
        }
        // Code block marker
        if (line.startsWith("```")) return null;
        // Empty line
        if (!line.trim()) return <div key={i} className="h-2" />;
        // Regular paragraph
        return (
          <p key={i} className="text-sm text-slate-700 mb-1 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />
        );
      })}
    </div>
  );
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-slate-100 rounded text-xs font-mono text-blue-700">$1</code>');
}

// ─── Main Page Component ──────────────────────────────────────────────────────
function ContentManagementPage({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const courseId = params?.id || "";
  const [courseName, setCourseName] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingDay, setSavingDay] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  const [previewDay, setPreviewDay] = useState(null);
  const [editedNotes, setEditedNotes] = useState({});

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/admin/course/${courseId}/content`);
      setCourseName(res.data.courseName);
      setLessons(res.data.content || []);
      // Initialize edited notes
      const notesMap = {};
      (res.data.content || []).forEach((l) => {
        notesMap[l.day] = l.notes;
      });
      setEditedNotes(notesMap);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load course content");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, courseId]);

  useEffect(() => {
    if (courseId) fetchContent();
  }, [courseId, fetchContent]);

  const handleSave = async (day) => {
    try {
      setSavingDay(day);
      const res = await axios.put(`${apiUrl}/api/admin/course/${courseId}/content`, {
        day,
        notes: editedNotes[day] || "",
      });
      toast.success(res.data.message);
      // Update local state
      setLessons((prev) =>
        prev.map((l) => (l.day === day ? { ...l, notes: editedNotes[day] } : l))
      );
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setSavingDay(null);
    }
  };

  const handleNotesChange = (day, value) => {
    setEditedNotes((prev) => ({ ...prev, [day]: value }));
  };

  const isModified = (day) => {
    const original = lessons.find((l) => l.day === day)?.notes || "";
    return editedNotes[day] !== original;
  };

  const totalWithContent = lessons.filter((l) => l.notes && l.notes.trim().length > 0).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/course"
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
            <FileText size={18} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Lesson Content</h1>
            <p className="text-xs text-slate-500">{courseName || "Loading..."}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-semibold mb-1">
            <BookOpen size={11} className="text-blue-500" />
            Total Lessons
          </div>
          <p className="text-xl font-bold text-slate-800">{lessons.length}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-semibold mb-1">
            <CheckCircle size={11} className="text-green-500" />
            With Content
          </div>
          <p className="text-xl font-bold text-slate-800">{totalWithContent}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-semibold mb-1">
            <Sparkles size={11} className="text-amber-500" />
            AI Context
          </div>
          <p className="text-xl font-bold text-slate-800">
            {totalWithContent > 0
              ? `${Math.round((totalWithContent / lessons.length) * 100)}%`
              : "0%"}
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-6 flex items-start gap-2">
        <Sparkles size={14} className="text-blue-600 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Lesson content is used by AI Tutor</strong> to answer student questions accurately.
          Use headings (<code className="px-1 bg-blue-100 rounded text-[10px]"># Heading</code>), 
          bullet points (<code className="px-1 bg-blue-100 rounded text-[10px]">- item</code>), 
          and <code className="px-1 bg-blue-100 rounded text-[10px]">**bold**</code> for best results.
          Content is also shown to students below the video.
        </p>
      </div>

      {/* Lesson Cards */}
      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-7 h-7 border-3 border-slate-200 border-t-[#090D24] rounded-full animate-spin" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="py-16 text-center">
          <BookOpen size={32} className="text-slate-200 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No lessons in this course yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lessons
            .sort((a, b) => a.day - b.day)
            .map((lesson) => {
              const isExpanded = expandedDay === lesson.day;
              const isPreviewing = previewDay === lesson.day;
              const hasContent = lesson.notes && lesson.notes.trim().length > 0;
              const modified = isModified(lesson.day);

              return (
                <div
                  key={lesson.day}
                  className={`bg-white rounded-xl border shadow-sm transition-all ${
                    isExpanded
                      ? "border-purple-200 ring-1 ring-purple-100"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {/* Lesson Header */}
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : lesson.day)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        hasContent
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}
                    >
                      {lesson.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">Day {lesson.day}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {hasContent
                          ? `${(lesson.notes || "").length} chars • ${(lesson.notes || "").split("\n").length} lines`
                          : "No content yet"}
                      </p>
                    </div>
                    {hasContent && (
                      <CheckCircle size={14} className="text-green-500 shrink-0" />
                    )}
                    {modified && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Unsaved
                      </span>
                    )}
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded Editor */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-slate-100">
                      {/* Toolbar */}
                      <div className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewDay(isPreviewing ? null : lesson.day)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                              isPreviewing
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            {isPreviewing ? (
                              <>
                                <EyeOff size={12} /> Edit
                              </>
                            ) : (
                              <>
                                <Eye size={12} /> Preview
                              </>
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">
                            {(editedNotes[lesson.day] || "").length} chars
                          </span>
                          <button
                            onClick={() => handleSave(lesson.day)}
                            disabled={!modified || savingDay === lesson.day}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                              modified
                                ? "bg-[#090D24] text-white hover:bg-black"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {savingDay === lesson.day ? (
                              <>
                                <Loader2 size={12} className="animate-spin" /> Saving...
                              </>
                            ) : (
                              <>
                                <Save size={12} /> Save
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Editor / Preview */}
                      {isPreviewing ? (
                        <div className="min-h-[200px] p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <MarkdownPreview content={editedNotes[lesson.day]} />
                        </div>
                      ) : (
                        <textarea
                          value={editedNotes[lesson.day] || ""}
                          onChange={(e) => handleNotesChange(lesson.day, e.target.value)}
                          placeholder={"# Lesson Title\n\n## Key Concepts\n- Concept 1\n- Concept 2\n\n## Explanation\nAdd your lesson content here...\n\n## Examples\n`code example here`\n\nThis content is used by AI Tutor to answer student questions."}
                          className="w-full min-h-[250px] px-4 py-3 text-sm font-mono leading-relaxed border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-y placeholder:text-slate-300 transition"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default ContentManagementPage;
