import React, { useState, useRef } from "react";
import { useInterview } from "../hook/useInterview";

const Home = () => {
     const {loading,generateReport }=useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    }
  };

  const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file && file.type === "application/pdf") {
    setResumeFile(file);
  }
}

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleGenerate = async () => {
    if (!resumeFile || !jobDescription.trim()) return;
    setIsGenerating(true);
    // API call goes here
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const isReady = resumeFile && jobDescription.trim().length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden">

      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative flex items-center px-10 py-5 border-b border-zinc-800/60">
        <span className="text-lg font-semibold tracking-tight">PrepTitan</span>
      </nav>

      {/* Hero */}
      <div className="relative text-center pt-12 pb-4 px-5">
        <span className="inline-block px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium tracking-wider uppercase mb-4">
          AI-Powered Interview Prep
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-zinc-50 via-zinc-50 to-zinc-500 bg-clip-text text-transparent">
          Know what they'll ask
          <br />
          before they ask it
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mt-3 leading-relaxed">
          Upload your resume, paste the job description, and get a personalized
          interview report with questions, skill gaps, and a prep plan.
        </p>
      </div>

      {/* Main Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto px-6 pt-8 pb-16">

        {/* Left — Job Description */}
        <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-6 flex flex-col backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-red-500/10 flex items-center justify-center text-sm">📋</div>
            <label className="text-sm font-semibold text-zinc-200">Job Description</label>
          </div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={"Paste the full job description here...\n\nInclude role title, responsibilities, required skills, and qualifications for the most accurate interview prep."}
            className="flex-1 min-h-[320px] bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-4 text-sm text-zinc-300 leading-relaxed resize-none outline-none placeholder-zinc-600 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition"
          />
          <div className="flex justify-end mt-2">
            <span className={`text-xs transition-colors ${jobDescription.length > 50 ? "text-green-400" : "text-zinc-600"}`}>
              {jobDescription.length > 50 && "✓ "}{jobDescription.length} chars
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">

          {/* Resume Upload */}
          <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-orange-500/10 flex items-center justify-center text-sm">📄</div>
              <label className="text-sm font-semibold text-zinc-200">Resume</label>
              <span className="text-[11px] text-zinc-600 ml-auto">PDF only · Max 3MB</span>
            </div>

            {!resumeFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl py-9 px-5 text-center cursor-pointer transition-all duration-200 ${isDragging ? "border-red-500 bg-red-500/5" : "border-zinc-800 hover:border-zinc-600"}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3.5 text-xl transition-all duration-200 ${isDragging ? "bg-red-500/15" : "bg-zinc-800/50"}`}>
                  {isDragging ? "⬇" : "↑"}
                </div>
                <p className={`text-sm font-medium mb-1 transition-colors ${isDragging ? "text-red-400" : "text-zinc-400"}`}>
                  {isDragging ? "Release to upload" : "Drop your resume here"}
                </p>
                <p className="text-xs text-zinc-600">or click to browse files</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3.5 bg-red-500/5 border border-red-500/15 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-lg shrink-0">📄</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-zinc-200 truncate">{resumeFile.name}</p>
                  <p className="text-[11px] text-red-400 mt-0.5">{formatFileSize(resumeFile.size)} · Ready</p>
                </div>
                <button
                  onClick={removeFile}
                  className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Self Description */}
          <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-6 flex-1 flex flex-col backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-green-500/10 flex items-center justify-center text-sm">✍</div>
              <label className="text-sm font-semibold text-zinc-200">About You</label>
              <span className="text-[11px] text-zinc-600 ml-auto">Optional</span>
            </div>
            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder={"Briefly describe your experience, strengths, and what you're looking for...\n\nThis helps the AI tailor questions to your background."}
              className="flex-1 min-h-[120px] bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-4 text-sm text-zinc-300 leading-relaxed resize-none outline-none placeholder-zinc-600 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 rounded-xl text-[15px] font-semibold transition-all duration-300 bg-red-600 hover:bg-red-500 text-white shadow-lg cursor-pointer hover:-translate-y-0.5"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2.5">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                Analyzing Resume...
              </span>
            ) : (
              <>Generate Interview Report →</>
            )}
          </button>

          {!isReady && (
            <p className="text-xs text-zinc-700 text-center">
              {!resumeFile && !jobDescription.trim()
                ? "Upload resume and paste job description to begin"
                : !resumeFile
                  ? "Upload your resume to continue"
                  : "Paste the job description to continue"
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;