import React, { useState } from 'react';

const patients = [
  { id: 1, name: 'John Doe', age: 30, diagnosis: 'Diabetes' },
  { id: 2, name: 'Jane Smith', age: 25, diagnosis: 'Hypertension' },
  { id: 3, name: 'Aarav Patel', age: 41, diagnosis: 'Asthma' },
  { id: 4, name: 'Emily Johnson', age: 52, diagnosis: 'Coronary Artery Disease' },
  { id: 5, name: 'Noah Williams', age: 37, diagnosis: 'Chronic Kidney Disease' },
  { id: 6, name: 'Sophia Brown', age: 29, diagnosis: 'Hypothyroidism' },
  { id: 7, name: 'Liam Davis', age: 46, diagnosis: 'COPD' },
  { id: 8, name: 'Olivia Miller', age: 33, diagnosis: 'Migraine' },
  { id: 9, name: 'Ethan Wilson', age: 58, diagnosis: 'Heart Failure' },
  { id: 10, name: 'Mia Anderson', age: 24, diagnosis: 'Iron Deficiency Anemia' },
  { id: 11, name: 'James Thomas', age: 62, diagnosis: 'Osteoarthritis' },
  { id: 12, name: 'Isabella Moore', age: 35, diagnosis: 'Depression' },
  { id: 13, name: 'Benjamin Taylor', age: 49, diagnosis: 'Type 2 Diabetes' },
  { id: 14, name: 'Charlotte Martin', age: 27, diagnosis: 'PCOS' },
];

const PatientDetails: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const isGrid = view === 'grid';
  const [query, setQuery] = useState('');

  const filtered = patients.filter(p =>
    `${p.name} ${p.diagnosis}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page stack">
      <div className="page-header">
        <div>
          <h1>Patients</h1>
          <p>Browse and manage patient records.</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              className="input"
              placeholder="Search by name or diagnosis..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <span className="badge">{filtered.length} results</span>
          </div>
          <div className="toolbar-right">
            <label className="toggle">
              <span style={{ fontSize: 14 }}>List</span>
              <input
                className="toggle-input"
                type="checkbox"
                checked={isGrid}
                onChange={e => setView(e.target.checked ? 'grid' : 'list')}
                aria-label="Toggle patient view"
              />
              <span className="toggle-track" aria-hidden="true">
                <span className="toggle-thumb" />
              </span>
              <span style={{ fontSize: 14 }}>Grid</span>
            </label>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <h2 style={{ margin: 0 }}>No matches</h2>
          <p className="muted" style={{ marginTop: 6 }}>Try a different name or diagnosis keyword.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid-view">
          {filtered.map(patient => (
            <div key={patient.id} className="patient-card">
              <h3>{patient.name}</h3>
              <p>Age: {patient.age}</p>
              <p>Diagnosis: {patient.diagnosis}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="table">
          <div className="table-head">
            <div>Name</div>
            <div>Age</div>
            <div>Diagnosis</div>
          </div>
          {filtered.map(patient => (
            <div key={patient.id} className="table-row">
              <div className="table-primary">{patient.name}</div>
              <div>{patient.age}</div>
              <div>{patient.diagnosis}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
