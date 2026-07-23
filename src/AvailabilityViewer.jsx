import React from 'react';

export default function AvailabilityViewer({ availability }) {
  return (
    <div className="card">
      <h3>Interviewer Block Windows</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: '0' }}>
        {availability.map((avail) => (
          <li key={avail.id} style={{ marginBottom: '10px' }}>
            <strong>{avail.interviewer_name}</strong>:<br />
            <span style={{ color: '#64748b', fontSize: '0.85em' }}>
              {new Date(avail.start_time).toLocaleString()} - {new Date(avail.end_time).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
