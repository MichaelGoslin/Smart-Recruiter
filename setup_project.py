import os

# Define project architecture and full source structures
project_files = {
    # Main Configuration Files
    "package.json": """{
  "name": "recruiting-coordinator-prototype",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.2.11"
  }
}""",
    "vite.config.js": """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})""",
    "index.html": """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recruiting Coordinator Dashboard Prototype</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>""",

    # Application Code Assets
    "src/main.jsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)""",
    "src/App.css": """:root {
  --primary: #2563eb;
  --bg: #f8fafc;
  --card: #ffffff;
  --text: #1e293b;
  --border: #e2e8f0;
}
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  margin: 0;
  padding: 20px;
}
.app-container {
  max-width: 1200px;
  margin: 0 auto;
}
.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}
h1, h2, h3 { color: #0f172a; margin-top: 0; }
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th, td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
}
th { background-color: #f1f5f9; }
button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
button:hover { background-color: #1d4ed8; }
.btn-cancel { background-color: #ef4444; }
.btn-cancel:hover { background-color: #dc2626; }
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}
.form-group select, .form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
}
.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 600;
}
.badge-active { background: #dcfce7; color: #15803d; }
.badge-cancelled { background: #fee2e2; color: #b91c1c; }""",
    "src/App.jsx": """import React, { useState, useEffect } from 'react';
import './App.css';

// Initial Mock Datasets
const INITIAL_CANDIDATES = [
  { id: 1, name: 'Emma Watson', email: 'emma@example.com', role_applied: 'Frontend Engineer', status: 'Pending' },
  { id: 2, name: 'Liam Neeson', email: 'liam@example.com', role_applied: 'Backend Engineer', status: 'Pending' },
  { id: 3, name: 'Olivia Wilde', email: 'olivia@example.com', role_applied: 'Product Manager', status: 'Scheduled' },
  { id: 4, name: 'Noah Centineo', email: 'noah@example.com', status: 'Pending', role_applied: 'UX Designer' },
  { id: 5, name: 'Ava DuVernay', email: 'ava@example.com', status: 'Completed', role_applied: 'Data Scientist' },
  { id: 6, name: 'Sophia Loren', email: 'sophia@example.com', status: 'Pending', role_applied: 'QA Engineer' },
  { id: 7, name: 'Jackson Pollock', email: 'jackson@example.com', status: 'Pending', role_applied: 'DevOps Engineer' },
  { id: 8, name: 'Lucas Film', email: 'lucas@example.com', status: 'Scheduled', role_applied: 'Engineering Manager' },
  { id: 9, name: 'Mia Hamm', email: 'mia@example.com', status: 'Pending', role_applied: 'Frontend Engineer' },
  { id: 10, name: 'Ethan Hunt', email: 'ethan@example.com', status: 'Cancelled', role_applied: 'Security Engineer' }
];

const INITIAL_INTERVIEWERS = [
  { id: 1, name: 'Alex Rivera', email: 'alex@company.com', department: 'Engineering' },
  { id: 2, name: 'Beatrice Vance', email: 'beatrice@company.com', department: 'Product' },
  { id: 3, name: 'Charles Xavier', email: 'charles@company.com', department: 'Engineering' },
  { id: 4, name: 'Diana Prince', email: 'diana@company.com', department: 'Design' },
  { id: 5, name: 'Evan Wright', email: 'evan@company.com', department: 'Data' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@company.com', department: 'Engineering' },
  { id: 7, name: 'George Clooney', email: 'george@company.com', department: 'Engineering' },
  { id: 8, name: 'Hannah Abbott', email: 'hannah@company.com', department: 'HR' },
  { id: 9, name: 'Ian Malcolm', email: 'ian@company.com', department: 'Data' },
  { id: 10, name: 'Julia Roberts', email: 'julia@company.com', department: 'Management' }
];

const INITIAL_AVAILABILITY = [
  { id: 1, interviewer_id: 1, interviewer_name: 'Alex Rivera', start_time: '2026-07-24T09:00', end_time: '2026-07-24T10:00' },
  { id: 2, interviewer_id: 1, interviewer_name: 'Alex Rivera', start_time: '2026-07-24T14:00', end_time: '2026-07-24T15:00' },
  { id: 3, interviewer_id: 2, interviewer_name: 'Beatrice Vance', start_time: '2026-07-24T10:00', end_time: '2026-07-24T11:00' },
  { id: 4, interviewer_id: 3, interviewer_name: 'Charles Xavier', start_time: '2026-07-24T11:00', end_time: '2026-07-24T12:00' },
  { id: 5, interviewer_id: 4, interviewer_name: 'Diana Prince', start_time: '2026-07-24T13:00', end_time: '2026-07-24T14:00' },
  { id: 6, interviewer_id: 5, interviewer_name: 'Evan Wright', start_time: '2026-07-24T15:00', end_time: '2026-07-24T16:00' },
  { id: 7, interviewer_id: 6, interviewer_name: 'Fiona Gallagher', start_time: '2026-07-24T09:00', end_time: '2026-07-24T10:00' },
  { id: 8, interviewer_id: 7, interviewer_name: 'George Clooney', start_time: '2026-07-24T16:00', end_time: '2026-07-24T17:00' },
  { id: 9, interviewer_id: 8, interviewer_name: 'Hannah Abbott', start_time: '2026-07-24T10:00', end_time: '2026-07-24T11:00' },
  { id: 10, interviewer_id: 9, interviewer_name: 'Ian Malcolm', start_time: '2026-07-24T11:00', end_time: '2026-07-24T12:00' }
];

const INITIAL_INTERVIEWS = [
  { id: 1, candidate_id: 3, candidate_name: 'Olivia Wilde', candidate_email: 'olivia@example.com', role_applied: 'Product Manager', interviewer_id: 2, interviewer_name: 'Beatrice Vance', start_time: '2026-07-24T10:00', end_time: '2026-07-24T11:00', status: 'Scheduled' },
  { id: 2, candidate_id: 8, candidate_name: 'Lucas Film', candidate_email: 'lucas@example.com', role_applied: 'Engineering Manager', interviewer_id: 10, interviewer_name: 'Julia Roberts', start_time: '2026-07-24T14:00', end_time: '2026-07-24T15:00', status: 'Scheduled' }
];

export default function App() {
  // Initialize dynamic persistent states using LocalStorage fallback interfaces
  const [candidates, setCandidates] = useState(() => {
    const local = localStorage.getItem('rc_candidates');
    return local ? JSON.parse(local) : INITIAL_CANDIDATES;
  });
  const [interviewers] = useState(INITIAL_INTERVIEWERS);
  const [availability] = useState(INITIAL_AVAILABILITY);
  const [interviews, setInterviews] = useState(() => {
    const local = localStorage.getItem('rc_interviews');
    return local ? JSON.parse(local) : INITIAL_INTERVIEWS;
  });

  // State Synchronization Side-Effects
  useEffect(() => {
    localStorage.setItem('rc_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('rc_interviews', JSON.stringify(interviews));
  }, [interviews]);

  // UI Form States
  const [candidateId, setCandidateId] = useState('');
  const [interviewerId, setInterviewerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!candidateId || !interviewerId || !startTime || !endTime) {
      setErrorMessage('Validation Failure: All fields are required.');
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      setErrorMessage('Validation Failure: Start time must occur before End time.');
      return;
    }

    // Engine Conflict Detection Rule
    const hasConflict = interviews.some(interview => {
      if (interview.interviewer_id === parseInt(interviewerId) && interview.status === 'Scheduled') {
        const interviewStart = new Date(interview.start_time);
        const interviewEnd = new Date(interview.end_time);
        return (
          (start <= interviewStart && end > interviewStart) || 
          (start < interviewEnd && end >= interviewEnd) ||
          (interviewStart <= start && interviewEnd >= end)
        );
      }
      return false;
    });

    if (hasConflict) {
      setErrorMessage('Conflict Error: The chosen interviewer is already booked during this time window.');
      return;
    }

    const selectedCandidate = candidates.find(c => c.id === parseInt(candidateId));
    const selectedInterviewer = interviewers.find(i => i.id === parseInt(interviewerId));

    const newInterview = {
      id: interviews.length + 1,
      candidate_id: selectedCandidate.id,
      candidate_name: selectedCandidate.name,
      candidate_email: selectedCandidate.email,
      role_applied: selectedCandidate.role_applied,
      interviewer_id: selectedInterviewer.id,
      interviewer_name: selectedInterviewer.name,
      start_time: startTime,
      end_time: endTime,
      status: 'Scheduled'
    };
