import React, { useMemo, useState } from 'react';
import { showLocalNotification } from '../services/notifications';

const Home: React.FC = () => {
  const [notifyError, setNotifyError] = useState<string | null>(null);

  const notificationStatus = useMemo(() => {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
  }, []);

  const handleNotify = async () => {
    setNotifyError(null);
    const ok = await showLocalNotification({
      title: 'Healthcare Notification',
      body: 'Daily patient summary is ready to review.',
    });

    if (!ok) {
      if (notificationStatus === 'denied') {
        setNotifyError('Notifications are blocked in your browser settings. Allow notifications and try again.');
      } else if (notificationStatus === 'default') {
        setNotifyError('Please allow notifications when prompted and try again.');
      } else if (notificationStatus === 'unsupported') {
        setNotifyError('Notifications are not supported in this browser.');
      } else {
        setNotifyError('Could not send notification.');
      }
    }
  };

  return (
    <div className="page stack">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Operational overview of your clinic and patient activity.</p>
        </div>
        <div className="page-actions">
          <button className="button" type="button" onClick={handleNotify}>
            Send notification
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Active Patients</div>
          <div className="kpi-value">128</div>
          <div className="kpi-sub">+6 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Appointments Today</div>
          <div className="kpi-value">24</div>
          <div className="kpi-sub">3 upcoming in next hour</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Open Alerts</div>
          <div className="kpi-value">3</div>
          <div className="kpi-sub">Medication + vitals</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Avg. Wait Time</div>
          <div className="kpi-value">12m</div>
          <div className="kpi-sub">-2m vs yesterday</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="stack">
          <div className="card">
            <div className="card-head">
              <div>
                <h2 style={{ margin: 0 }}>Today’s schedule</h2>
                <div className="card-sub">Next appointments and pending tasks</div>
              </div>
              <span className="badge">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="schedule" role="list">
              <div className="schedule-row" role="listitem">
                <div className="schedule-time">09:30</div>
                <div>
                  <div className="schedule-title">Follow-up consult</div>
                  <div className="schedule-sub">Jane Smith • Hypertension</div>
                </div>
                <div className="badge">Room 2</div>
              </div>
              <div className="schedule-row" role="listitem">
                <div className="schedule-time">11:00</div>
                <div>
                  <div className="schedule-title">Lab review</div>
                  <div className="schedule-sub">John Doe • HbA1c results</div>
                </div>
                <div className="badge">Review</div>
              </div>
              <div className="schedule-row" role="listitem">
                <div className="schedule-time">15:30</div>
                <div>
                  <div className="schedule-title">New patient intake</div>
                  <div className="schedule-sub">Riya Patel • Initial assessment</div>
                </div>
                <div className="badge">Room 1</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <h2 style={{ margin: 0 }}>Recent activity</h2>
                <div className="card-sub">Latest updates across the platform</div>
              </div>
            </div>
            <div className="list">
              <div className="list-row">
                <div>
                  <div className="list-title">New lab results uploaded</div>
                  <div className="list-sub">John Doe • HbA1c report</div>
                </div>
                <div className="badge">Now</div>
              </div>
              <div className="list-row">
                <div>
                  <div className="list-title">Appointment confirmed</div>
                  <div className="list-sub">Jane Smith • 3:30 PM</div>
                </div>
                <div className="badge">Today</div>
              </div>
              <div className="list-row">
                <div>
                  <div className="list-title">Alert escalated</div>
                  <div className="list-sub">BP spike detected • Review required</div>
                </div>
                <div className="badge">High</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <div className="card-head">
              <div>
                <h2 style={{ margin: 0 }}>Quick actions</h2>
                <div className="card-sub">Common tasks for today</div>
              </div>
            </div>

            <div className="quick-actions">
              <button className="button" type="button" onClick={handleNotify}>
                Send notification
              </button>

              <div className="quick-meta">
                <div className="muted">
                  Notifications: <span style={{ color: 'var(--text-h)' }}>{notificationStatus}</span>
                </div>
                <div className="muted">Delivered via on-device notifications when enabled.</div>
              </div>

              {notifyError && <div className="error">{notifyError}</div>}

              <div className="divider" />

              <div className="status-grid">
                <div className="status-item">
                  <div className="status-dot" />
                  <div>
                    <div className="status-title">Systems</div>
                    <div className="status-sub">All services online</div>
                  </div>
                </div>
                <div className="status-item">
                  <div className="status-dot status-dot-warn" />
                  <div>
                    <div className="status-title">Alerts</div>
                    <div className="status-sub">3 items need review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <h2 style={{ margin: 0 }}>Highlights</h2>
                <div className="card-sub">Where to focus right now</div>
              </div>
            </div>
            <div className="note">
              <div className="note-title">Care team capacity looks healthy</div>
              <div className="note-body">Allocate one additional slot for triage between 2–4 PM to keep wait time below 15 minutes.</div>
            </div>
            <div className="note">
              <div className="note-title">Follow-ups improving outcomes</div>
              <div className="note-body">Completion rate up this week. Consider enabling reminders for diabetes cohorts.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
