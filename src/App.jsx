import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import ScheduleForm from './ScheduleForm';
import AvailabilityViewer from './AvailabilityViewer';
import './App.css';

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

  useEffect(() => {
    localStorage.setItem('rc_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('rc_interviews', JSON.stringify(interviews));
  }, [interviews]);

  const handleScheduleSubmit = ({ candidateId, interviewerId, startTime, endTime }) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

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
      return false;
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

    setInterviews([...interviews, newInterview]);
    setCandidates(candidates.map(c => c.id === selectedCandidate.id ? { ...c, status: 'Scheduled' } : c));
    return true;
  };

  const handleCancelInterview = (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setInterviews(interviews.map(item => item.id === id ? { ...item, status: 'Cancelled' } : item));
  };

  return (
    <div className="app-container">
      <header>
        <h1>SmartRecruit RC Prototype (Offline Database Engine)</h1>
        <p>A modularized, client-side prototype tracking schedule limits and operational workflows flawlessly.</p>
      </header>

      <div className="grid-layout">
        <div className="main-panel">
          <Dashboard interviews={interviews} onCancel={handleCancelInterview} />
        </div>

        <div className="side-panel">
          <ScheduleForm 
            candidates={candidates} 
            interviewers={interviewers} 
            onSchedule={handleScheduleSubmit} 
          />
          <AvailabilityViewer availability={availability} />
        </div>
      </div>
    </div>
  );
}
