import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [skillsFound, setSkillsFound] = useState([]);

const analyzeResume = () => {
  if (!resume.trim()) return;

  setLoading(true);

  const text = resume.toLowerCase();

  let score = 0;
  const skills = [];
  const suggestions = [];

  if (text.includes("python")) skills.push("Python");
  if (text.includes("sql")) skills.push("SQL");
  if (text.includes("java")) skills.push("Java");
  if (text.includes("javascript")) skills.push("JavaScript");
  if (text.includes("react")) skills.push("React");
  if (text.includes("html")) skills.push("HTML");
  if (text.includes("css")) skills.push("CSS");

  if (text.includes("skills")) score += 25;
  else suggestions.push("Add a Skills section");

  if (text.includes("experience")) score += 25;
  else suggestions.push("Add an Experience section");

if (
  text.includes("project") ||
  text.includes("projects") ||
  text.includes("portfolio")
) {
  score += 20;
} else {
  suggestions.push("Add Projects");
}

  if (text.includes("education")) score += 20;
  else suggestions.push("Add Education details");

  if (text.includes("python")) score += 5;
  if (text.includes("sql")) score += 5;

  setScore(score);
  setFeedback(suggestions);
  setSkillsFound(skills);

  if (score >= 80)
    setStatus("Excellent ATS Score");
  else if (score >= 60)
    setStatus("Good Resume");
  else
    setStatus("Needs Improvement");

  setLoading(false);
};

  return (
    <div className="page">

      <div className="card left">
        <h1>ATS Resume Checker</h1>
        <p className="sub">Get instant resume feedback</p>
        <p className="contact">
  Kavya Gowda | gkavya572@gmail.com
</p>

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
          <p
  style={{
    color:
      score >= 80
        ? "#22c55e"
        : score >= 60
        ? "#facc15"
        : "#ef4444",
  }}
>
  {status}
</p>
        </a>
      </div>

     <div className="card right">
  <h2>Result</h2>

  <div className="scoreBox">
    <h1>{score}/100</h1>
    <p
  style={{
    color:
      score >= 80
        ? "#22c55e"
        : score >= 60
        ? "#facc15"
        : "#ef4444",
  }}
>
  {status}
</p>
     <p>Words Analyzed: {resume.split(" ").filter(word => word).length}</p>
  </div>
  

 {feedback.length > 0 && (
  <>
    <h3>Suggestions</h3>
    <ul>
      {feedback.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </>
)}
{skillsFound.length > 0 && (
  <>
    <h3>Detected Skills</h3>
    <ul>
      {skillsFound.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </>
)}
 

</div>

    </div>
  );
}

export default App;