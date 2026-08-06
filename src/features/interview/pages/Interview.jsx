import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useInterview } from "../hook/useInterview";

const severityStyles = {
  low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  high: "text-red-400 bg-red-500/10 border-red-500/20",
};

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions", icon: "⚙" },
  { id: "behavioral", label: "Behavioral Questions", icon: "◈" },
  { id: "roadmap", label: "Roadmap", icon: "◎" },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function ScoreRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#ef4444" : score >= 50 ? "#f59e0b" : "#71717a";
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#27272a" strokeWidth="8" />
        <circle cx="64" cy="64" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-zinc-50">{score}</span>
        <span className="text-[10px] text-zinc-500 tracking-wider uppercase">Match</span>
      </div>
    </div>
  );
}

function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl overflow-hidden backdrop-blur-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-3 p-5 text-left cursor-pointer">
        <span className="text-xs font-mono text-red-500/70 mt-0.5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex-1 text-sm font-medium text-zinc-100 leading-relaxed">{q.question}</span>
        <span className={`text-zinc-500 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pl-11 space-y-3 border-t border-zinc-800/60 pt-4">
          <div>
            <p className="text-[11px] font-semibold text-red-400/80 uppercase tracking-wider mb-1">Why they ask this</p>
            <p className="text-[13px] text-zinc-400 leading-relaxed">{q.intention}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-emerald-400/80 uppercase tracking-wider mb-1">How to answer</p>
            <p className="text-[13px] text-zinc-400 leading-relaxed">{q.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PreviousReportsView({ reports, currentId, onSelect }) {
  return (
    <div className="space-y-3">
      {reports?.length === 0 && (
        <p className="text-sm text-zinc-600 text-center py-8">No previous reports found.</p>
      )}
      {reports?.map((r) => (
        <button
          key={r._id}
          onClick={() => onSelect(r._id)}
          className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
            r._id === currentId
              ? "bg-zinc-800 border-zinc-700"
              : "bg-zinc-900/70 border-zinc-800/60 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-semibold text-zinc-100 leading-snug">{r.title || "Interview Report"}</p>
            {r._id === currentId && (
              <span className="text-[10px] text-red-400 font-medium bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full shrink-0">Current</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500">{formatDate(r.createdAt)}</span>
            <span className="text-zinc-700">·</span>
            <span className="text-[11px] text-zinc-500">{formatTime(r.createdAt)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function InterviewReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { report, reports, loading, getReportById, getReports } = useInterview();
  const [activeTab, setActiveTab] = useState("technical");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPreviousReports, setShowPreviousReports] = useState(false);

  useEffect(() => {
    getReportById(id);
    getReports();
  }, [id]);

  if (loading || !report) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-500 text-sm">
          <span className="w-4 h-4 border-2 border-zinc-700 border-t-red-500 rounded-full animate-spin inline-block" />
          Loading report...
        </div>
      </div>
    );
  }

  const counts = {
    technical: report.technicalQuestions?.length || 0,
    behavioral: report.behavioralQuestions?.length || 0,
    roadmap: report.preparationPlan?.length || 0,
  };

  const handleSelectReport = (reportId) => {
    navigate(`/interview/${reportId}`);
    setShowPreviousReports(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-5 lg:px-10 py-4 border-b border-zinc-800/60">
        <span className="text-lg font-semibold tracking-tight">PrepTitan</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="hidden lg:flex text-xs text-zinc-500 hover:text-zinc-300 transition cursor-pointer items-center gap-1.5"
          >
            ← New Report
          </button>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1 p-2 cursor-pointer"
          >
            <span className={`w-5 h-0.5 bg-zinc-400 transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-5 h-0.5 bg-zinc-400 transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-zinc-400 transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-50 bg-zinc-900 border-b border-zinc-800 px-5 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); setShowPreviousReports(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === item.id && !showPreviousReports
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              <span>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${activeTab === item.id && !showPreviousReports ? "bg-white/20" : "bg-zinc-800 text-zinc-500"}`}>
                {counts[item.id]}
              </span>
            </button>
          ))}
          <button
            onClick={() => { setShowPreviousReports(true); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              showPreviousReports ? "bg-red-600 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            <span>◷</span>
            <span className="flex-1 text-left">Previous Reports</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${showPreviousReports ? "bg-white/20" : "bg-zinc-800 text-zinc-500"}`}>
              {reports?.length || 0}
            </span>
          </button>
          <button
            onClick={() => { navigate("/"); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            ← New Report
          </button>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8 lg:grid lg:grid-cols-[240px_1fr_260px] gap-6">

        {/* Left Sidebar — desktop only */}
        <aside className="hidden lg:flex flex-col gap-5 sticky top-8 h-[calc(100vh-120px)] overflow-y-auto">
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-wider mb-2 px-1">This Report</p>
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setShowPreviousReports(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === item.id && !showPreviousReports
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/20"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${activeTab === item.id && !showPreviousReports ? "bg-white/20" : "bg-zinc-800 text-zinc-500"}`}>
                    {counts[item.id]}
                  </span>
                </button>
              ))}

            </nav>
          </div>

        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {showPreviousReports ? (
            <div>
              <div className="mb-6">
                <p className="text-xs text-red-400 font-medium tracking-wider uppercase mb-1">History</p>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Previous Reports</h1>
                <p className="text-sm text-zinc-500 mt-1">{reports?.length || 0} reports generated</p>
              </div>
              <PreviousReportsView reports={reports} currentId={id} onSelect={handleSelectReport} />
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-xs text-red-400 font-medium tracking-wider uppercase mb-1">{report.title}</p>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
                  {activeTab === "technical" && "Technical Questions"}
                  {activeTab === "behavioral" && "Behavioral Questions"}
                  {activeTab === "roadmap" && "Preparation Roadmap"}
                </h1>
              </div>

              {activeTab === "technical" && (
                <div className="space-y-3">
                  {report.technicalQuestions?.map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                </div>
              )}

              {activeTab === "behavioral" && (
                <div className="space-y-3">
                  {report.behavioralQuestions?.map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                </div>
              )}

              {activeTab === "roadmap" && (
                <div className="relative pl-8">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-zinc-800" />
                  <div className="space-y-6">
                    {report.preparationPlan?.map((day, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-red-600 border-4 border-zinc-950 flex items-center justify-center text-[10px] font-bold">
                          {day.day}
                        </div>
                        <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-5 backdrop-blur-sm">
                          <p className="text-[11px] text-red-400 font-medium uppercase tracking-wider mb-1">Day {day.day}</p>
                          <h3 className="text-sm font-semibold text-zinc-100 mb-3">{day.focus}</h3>
                          <ul className="space-y-2">
                            {day.tasks?.map((task, j) => (
                              <li key={j} className="flex items-start gap-2 text-[13px] text-zinc-400">
                                <span className="text-zinc-600 mt-0.5">–</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right panel */}
        <aside className="hidden lg:flex flex-col gap-4 sticky top-8 h-fit">
          <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm text-center">
            <ScoreRing score={report.matchScore} />
            <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
              How closely your profile matches the job description
            </p>
          </div>

          {report.skillGaps?.length > 0 && (
            <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">Skill Gaps</p>
              <div className="space-y-2.5">
                {report.skillGaps.map((gap, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <span className="text-[12px] text-zinc-400 leading-snug">{gap.skill}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${severityStyles[gap.severity]}`}>
                      {gap.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">Generated</p>
            <p className="text-sm text-zinc-400">{formatDate(report.createdAt)}</p>
            <p className="text-xs text-zinc-600">{formatTime(report.createdAt)}</p>
          </div>
        </aside>

        {/* Mobile score + skill gaps — shown below content */}
        <div className="lg:hidden mt-6 space-y-4">
          <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm text-center">
            <ScoreRing score={report.matchScore} />
            <p className="text-xs text-zinc-500 mt-4 leading-relaxed">Match score against job description</p>
          </div>

          {report.skillGaps?.length > 0 && (
            <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">Skill Gaps</p>
              <div className="space-y-2.5">
                {report.skillGaps.map((gap, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <span className="text-[12px] text-zinc-400 leading-snug">{gap.skill}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${severityStyles[gap.severity]}`}>
                      {gap.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}