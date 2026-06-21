import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resume.trim()) return;

    setLoading(true);

    setTimeout(() => {
      let score = 0;

      if (resume.includes("skills")) score += 30;
      if (resume.includes("experience")) score += 30;
      if (resume.includes("project")) score += 20;
      if (resume.includes("education")) score += 20;

      setScore(score);
      setStatus(score > 60 ? "Good" : "Needs Improvement");

      setLoading(false);
    }, 800);
  };

  return (
    <div className="page">

      <div className="card left">
        <h1>ATS Resume Checker</h1>
        <p className="sub">Get instant resume feedback</p>

        <textarea
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <button onClick={analyzeResume} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          <button style={{ marginTop: "10px", background: "#22c55e" }}>
            Built for Digital Heroes
          </button>
        </a>
      </div>

      <div className="card right">
        <h2>Result</h2>

        <div className="scoreBox">
          <h1>{score}/100</h1>
          <p>{status}</p>
        </div>

      </div>

    </div>
  );
}

export default App;