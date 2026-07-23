import React from 'react';

export default function Dashboard({ interviews, onCancel }) {
  return (
    <div className="card">
      <h2>Scheduled Interviews Dashboard</h2>
      {interviews.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No active interviews scheduled.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Candidate Details</th>
                <th>Role Target</th>
                <th>Assigned Interviewer</th>
                <th>Date & Time Window</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.candidate_name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.candidate_email}</div>
                  </td>
                  <td><span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{item.role_applied}</span></td>
                  <td><div style={{ color: 'var(--text-main)' }}>{item.interviewer_name}</div></td>
                  <td>
                    <div style={{ fontWeight: '500' }}>
                      {new Date(item.start_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {new Date(item.start_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === 'Scheduled' && (
                      <button className="btn-cancel" onClick={() => onCancel(item.id)}>
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
