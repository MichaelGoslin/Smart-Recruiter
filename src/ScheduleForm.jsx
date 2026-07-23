import React, { useState } from 'react';

export default function ScheduleForm({ candidates, interviewers, onSchedule }) {
  const [candidateId, setCandidateId] = useState('');
  const [interviewerId, setInterviewerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!candidateId || !interviewerId || !startTime || !endTime) {
      setError('Validation Failure: All fields are required.');
      return;
    }

    const success = onSchedule({ candidateId, interviewerId, startTime, endTime });
    
    if (success) {
      setCandidateId('');
      setInterviewerId('');
      setStartTime('');
      setEndTime('');
    } else {
      setError('Conflict Error: The chosen interviewer is already booked during this time window.');
    }
  };

  return (
    <div className="card">
      <h3>Schedule New Interview</h3>
      {error && <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9em' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Candidate</label>
          <select value={candidateId} onChange={e => setCandidateId(e.target.value)}>
            <option value="">Select Candidate</option>
            {candidates.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.role_applied}) - [{c.status}]</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Interviewer</label>
          <select value={interviewerId} onChange={e => setInterviewerId(e.target.value)}>
            <option value="">Select Interviewer</option>
            {interviewers.map(i => <option key={i.id} value={i.id}>{i.name} - {i.department}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
        </div>
        <button type="submit" style={{ width: '100%' }}>Book Slot</button>
      </form>
    </div>
  );
}
