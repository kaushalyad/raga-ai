import React, { useMemo, useState } from 'react';

const Analytics: React.FC = () => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('7d');

  const days = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);
  const appointments = useMemo(() => [18, 22, 16, 26, 20, 24, 19], []);
  const max = useMemo(() => Math.max(...appointments), [appointments]);
  const total = useMemo(() => appointments.reduce((a, b) => a + b, 0), [appointments]);
  const avg = useMemo(() => Math.round((total / appointments.length) * 10) / 10, [appointments.length, total]);

  return (
    <div className="page stack">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Trends and performance indicators for patient operations.</p>
        </div>

        <div className="page-actions">
          <div className="chip-row" role="group" aria-label="Date range">
            <button
              className={range === '7d' ? 'chip chip-active' : 'chip'}
              type="button"
              onClick={() => setRange('7d')}
            >
              Last 7d
            </button>
            <button
              className={range === '30d' ? 'chip chip-active' : 'chip'}
              type="button"
              onClick={() => setRange('30d')}
            >
              Last 30d
            </button>
            <button
              className={range === '90d' ? 'chip chip-active' : 'chip'}
              type="button"
              onClick={() => setRange('90d')}
            >
              Last 90d
            </button>
          </div>
          <button className="button button-ghost" type="button" disabled>
            Export
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Monthly Visits</div>
          <div className="kpi-value">842</div>
          <div className="kpi-sub">+9% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Missed Appointments</div>
          <div className="kpi-value">4.1%</div>
          <div className="kpi-sub">-0.6% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Avg. Resolution Time</div>
          <div className="kpi-value">2.3h</div>
          <div className="kpi-sub">Alerts & care tasks</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Satisfaction</div>
          <div className="kpi-value">4.6/5</div>
          <div className="kpi-sub">Last 30 days</div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <div>
              <h2 style={{ margin: 0 }}>Appointments</h2>
              <div className="card-sub">Volume trend and distribution ({range.toUpperCase()})</div>
            </div>
            <div className="mini-kpis" aria-label="Appointments summary">
              <div className="mini-kpi">
                <div className="mini-kpi-label">Total</div>
                <div className="mini-kpi-value">{total}</div>
              </div>
              <div className="mini-kpi">
                <div className="mini-kpi-label">Avg / day</div>
                <div className="mini-kpi-value">{avg}</div>
              </div>
              <div className="mini-kpi">
                <div className="mini-kpi-label">Peak</div>
                <div className="mini-kpi-value">{max}</div>
              </div>
            </div>
          </div>

          <div className="chart" aria-label="Appointments bar chart">
            {appointments.map((v, i) => (
              <div key={days[i]} className="chart-col">
                <div
                  className="chart-bar"
                  style={{ height: `${Math.max(10, Math.round((v / max) * 100))}%` }}
                  aria-label={`${days[i]}: ${v} appointments`}
                />
                <div className="chart-x">{days[i]}</div>
                <div className="chart-y">{v}</div>
              </div>
            ))}
          </div>

          <div className="chart-legend" aria-label="Chart legend">
            <span className="legend-dot" />
            <span>Appointments</span>
            <span className="legend-spacer" />
            <span className="legend-note">Tip: Use this trend to allocate clinician slots and triage staffing.</span>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h2 style={{ margin: 0 }}>Insights</h2>
              <div className="card-sub">High-signal operational indicators</div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Top diagnoses</div>
            <div className="list">
              <div className="list-row">
                <div>
                  <div className="list-title">Hypertension</div>
                  <div className="list-sub">38 patients</div>
                </div>
                <div className="badge">30%</div>
              </div>
              <div className="list-row">
                <div>
                  <div className="list-title">Diabetes</div>
                  <div className="list-sub">29 patients</div>
                </div>
                <div className="badge">23%</div>
              </div>
              <div className="list-row">
                <div>
                  <div className="list-title">Asthma</div>
                  <div className="list-sub">14 patients</div>
                </div>
                <div className="badge">11%</div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Operational notes</div>
            <div className="note">
              <div className="note-title">Missed appointments trending down</div>
              <div className="note-body">Follow-up automation is working; consider extending reminders to high-risk cohorts.</div>
            </div>
            <div className="note">
              <div className="note-title">Care task resolution</div>
              <div className="note-body">Median resolution time is stable. Add escalation for tasks pending over 6 hours.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
