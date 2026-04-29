import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Schedule from './pages/Schedule';
import Menu from './pages/Menu';
import Reports from './pages/Reports';

import EditPinnedSheet from './sheets/EditPinnedSheet';
import ReportsWarningSheet from './sheets/ReportsWarningSheet';
import Profile from './sheets/Profile';
import NotificationsSheet from './sheets/NotificationsSheet';

const SHEET = {
  NONE:           null,
  PROFILE:        'profile',
  EDIT_PINNED:    'editPinned',
  REPORTS_WARN:   'reportsWarning',
  NOTIFICATIONS:  'notifications',
};

function ScheduleRoute({ openSheet }) {
  const navigate = useNavigate();
  return (
    <Schedule
      onApps={() => navigate('/menu')}
      onProfile={() => openSheet(SHEET.PROFILE)}
      onNotifications={() => openSheet(SHEET.NOTIFICATIONS)}
    />
  );
}

function MenuRoute({ openSheet }) {
  const navigate = useNavigate();

  const handleTileClick = useCallback((tileId) => {
    if (tileId === 'reports') {
      openSheet(SHEET.REPORTS_WARN);
      return;
    }
    console.log(`Tile "${tileId}" tapped — not yet wired`);
  }, [openSheet]);

  return (
    <Menu
      onClose={() => navigate('/')}
      onViewSchedule={() => navigate('/')}
      onEditPinned={() => openSheet(SHEET.EDIT_PINNED)}
      onTileClick={handleTileClick}
    />
  );
}

function ReportsRoute() {
  const navigate = useNavigate();
  return (
    <Reports
      onBack={() => navigate('/menu')}
      onMenu={() => navigate('/menu')}
    />
  );
}

export default function App() {
  const [activeSheet, setActiveSheet] = useState(SHEET.NONE);
  const navigate = useNavigate();

  const openSheet  = useCallback((id) => setActiveSheet(id), []);
  const closeSheet = useCallback(() => setActiveSheet(SHEET.NONE), []);

  const handleSavePinned = useCallback(() => {
    closeSheet();
  }, [closeSheet]);

  const handleReportsContinue = useCallback(() => {
    closeSheet();
    navigate('/reports');
  }, [closeSheet, navigate]);

  const handleLogout = useCallback(() => {
    closeSheet();
    console.log('Logging out…');
  }, [closeSheet]);

  return (
    <>
      <Routes>
        <Route path="/"        element={<ScheduleRoute openSheet={openSheet} />} />
        <Route path="/menu"    element={<MenuRoute    openSheet={openSheet} />} />
        <Route path="/reports" element={<ReportsRoute />} />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Routes>

      {activeSheet === SHEET.EDIT_PINNED && (
        <EditPinnedSheet
          onClose={closeSheet}
          onSave={handleSavePinned}
        />
      )}

      {activeSheet === SHEET.REPORTS_WARN && (
        <ReportsWarningSheet
          onCancel={closeSheet}
          onContinue={handleReportsContinue}
        />
      )}

      {activeSheet === SHEET.PROFILE && (
        <Profile
          onClose={closeSheet}
          onAccountSettings={() => console.log('Account Settings — TODO')}
          onNotificationPreferences={() => console.log('Notification Preferences — TODO')}
          onSupport={() => console.log('Support — TODO')}
          onLogout={handleLogout}
      {activeSheet === SHEET.NOTIFICATIONS && (
        <NotificationsSheet onClose={closeSheet} />
      )}
        />
      )}
    </>
  );
}