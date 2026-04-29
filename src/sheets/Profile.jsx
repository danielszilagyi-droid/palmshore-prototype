import React, { useEffect } from 'react';
import { X, UserCog, BellRing, HelpCircle, LogOut } from 'lucide-react';

const COLOR = {
  fabTeal: '#005C65',
  tealTint: '#E6F4F4',
  iconCircle: '#D4ECEC',
  emailLink: '#0F6E9C',
  scrim: 'rgba(0,0,0,0.40)',
  closeBtnBg: '#E0E0E0',
  grabber: '#CCCCCC',
};

const FONT = "'Roboto', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const ROBOTO_HREF = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';

function useRoboto() {
  useEffect(() => {
    if (document.querySelector(`link[href="${ROBOTO_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ROBOTO_HREF;
    document.head.appendChild(link);
  }, []);
}

function CloseCircleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: COLOR.closeBtnBg,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <X size={18} strokeWidth={2} color="#525252" />
    </button>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: COLOR.fabTeal,
        color: '#ffffff',
        height: 48,
        borderRadius: 999,
        fontSize: 15,
        fontWeight: 500,
        fontFamily: FONT,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        boxShadow: '0 1px 2px rgba(0,92,101,0.3)',
      }}
    >
      {children}
    </button>
  );
}

function UserAvatar() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 999,
        background: 'linear-gradient(135deg, #4a5d52 0%, #2d3a33 100%)',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 600,
        fontFamily: FONT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      AM
    </div>
  );
}

function UserCard({ name, title, email, branch }) {
  return (
    <section
      style={{
        background: COLOR.tealTint,
        borderRadius: 16,
        padding: 16,
        fontFamily: FONT,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <UserAvatar />
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#0a0a0a', margin: 0 }}>
            {name}
          </h3>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#0a0a0a', margin: '2px 0 0' }}>
            {title}
          </p>
          
            href={`mailto:${email}`}
            style={{
              fontSize: 14,
              lineHeight: '20px',
              color: COLOR.emailLink,
              margin: '6px 0 0',
              display: 'inline-block',
              textDecoration: 'none',
              fontWeight: 400,
            }}
          >
            {email}
          </a>
          <p style={{ fontSize: 14, lineHeight: '20px', color: '#0a0a0a', margin: '4px 0 0', fontWeight: 400 }}>
            {branch}
          </p>
        </div>
      </div>
    </section>
  );
}

function MenuRow({ icon: Icon, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        width: '100%',
        padding: '8px 4px',
        textAlign: 'left',
        borderRadius: 8,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: FONT,
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          background: COLOR.iconCircle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} strokeWidth={1.75} color={COLOR.fabTeal} />
      </span>
      <span style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
        <span style={{ display: 'block', fontSize: 16, fontWeight: 700, lineHeight: '22px', color: '#0a0a0a' }}>
          {title}
        </span>
        <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#5a5a5a', marginTop: 2, fontWeight: 400 }}>
          {subtitle}
        </span>
      </span>
    </button>
  );
}

const DEFAULT_USER = {
  name: 'Angela Maison',
  title: 'Senior Financial Advisor',
  email: 'a.maison@scotiabank.com',
  branch: 'Vancouver Fraser Branch',
};

export default function Profile({
  user = DEFAULT_USER,
  onClose,
  onAccountSettings,
  onNotificationPreferences,
  onSupport,
  onLogout,
}) {
  useRoboto();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        fontFamily: FONT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      <button
        type="button"
        aria-label="Dismiss sheet"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: COLOR.scrim,
          border: 'none',
          padding: 0,
          cursor: 'default',
          pointerEvents: 'auto',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 402,
          height: '62vh',
          maxHeight: '85vh',
          background: '#ffffff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: '0 -6px 24px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4, flexShrink: 0 }}>
          <div style={{ width: 36, height: 5, borderRadius: 999, background: COLOR.grabber }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px', flexShrink: 0 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: '22px', color: '#1a1a1a', margin: 0, fontFamily: FONT }}>
            Profile
          </h2>
          <CloseCircleButton onClick={onClose} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 8px' }}>
          <UserCard name={user.name} title={user.title} email={user.email} branch={user.branch} />
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <MenuRow icon={UserCog} title="Account Settings" subtitle="Edit your profile, password and preferences here" onClick={onAccountSettings} />
            <MenuRow icon={BellRing} title="Notification Preferences" subtitle="Adjust your notifications here" onClick={onNotificationPreferences} />
            <MenuRow icon={HelpCircle} title="Coconut Support | Help" subtitle="Help documentation and more" o