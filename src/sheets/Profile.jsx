import React, { useEffect } from 'react';
import {
  X, UserCog, BellRing, HelpCircle, LogOut,
} from 'lucide-react';

const COLOR = {
  fabTeal:      '#005C65',
  tealTint:     '#E6F4F4',
  iconCircle:   '#D4ECEC',
  emailLink:    '#0F6E9C',
  scrim:        'rgba(0,0,0,0.40)',
  closeBtnBg:   '#E0E0E0',
  grabber:      '#CCCCCC',
};

const FONT = "'Roboto', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

const ROBOTO_HREF =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';

function useRoboto() {
  useEffect(() => {
    if (document.querySelector(`link[href="${ROBOTO_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ROBOTO_HREF;
    document.head.appendChild(link);
  }, []);
}

function CloseCircleButton({ onClick, label = 'Close' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center transition-colors hover:brightness-95 active:scale-95"
      style={{
        width: 40, height: 40,
        borderRadius: 999,
        background: COLOR.closeBtnBg,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <X size={18} strokeWidth={2} className="text-neutral-600" />
    </button>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99] hover:brightness-110"
      style={{
        background: COLOR.fabTeal,
        color: '#ffffff',
        height: 48,
        borderRadius: 999,
        fontSize: 15,
        fontWeight: 500,
        fontFamily: FONT,
        letterSpacing: '0.2px',
        boxShadow: '0 1px 2px rgba(0,92,101,0.3)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function UserAvatar({ size = 56 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white shrink-0 ring-2 ring-white"
      style={{
        width: size, height: size,
        background: 'linear-gradient(135deg, #4a5d52 0%, #2d3a33 100%)',
        fontSize: size * 0.36,
        fontWeight: 600,
        fontFamily: FONT,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
      aria-hidden="true"
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
      <div className="flex items-start gap-4">
        <UserAvatar size={56} />
        <div className="min-w-0 flex-1">
          <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#0a0a0a', margin: 0 }}>
            {name}
          </h3>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#0a0a0a', margin: '2px 0 0' }}>
            {title}
          </p>
          
            href={`mailto:${email}`}
            style={{
              fontSize: 14, lineHeight: '20px', color: COLOR.emailLink,
              margin: '6px 0 0', display: 'inline-block', textDecoration: 'none', fontWeight: 400,
            }}
            className="hover:underline"
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
      className="flex items-start gap-4 w-full px-1 py-2 text-left transition-colors hover:bg-black/[0.02] active:bg-black/[0.04] rounded-lg"
      style={{ fontFamily: FONT, border: 'none', background: 'transparent', cursor: 'pointer' }}
    >
      <span
        className="flex items-center justify-center shrink-0"
        style={{ width: 40, height: 40, borderRadius: 999, background: COLOR.iconCircle }}
      >
        <Icon size={20} strokeWidth={1.75} color={COLOR.fabTeal} />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block" style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px', color: '#0a0a0a' }}>
          {title}
        </span>
        <span className="block" style={{ fontSize: 13, lineHeight: '18px', color: '#5a5a5a', marginTop: 2, fontWeight: 400 }}>
          {subtitle}
        </span>
      </span>
    </button>
  );
}

const DEFAULT_USER = {
  name:   'Angela Maison',
  title:  'Senior Financial Advisor',
  email:  'a.maison@scotiabank.com',
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
        inset: 0,
        zIndex: 1000,
        fontFamily: FONT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Dismiss sheet"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: COLOR.scrim,
          border: 'none',
          padding: 0,
          cursor: 'default',
          pointerEvents: 'auto',
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 402,
          maxHeight: '85vh',
          height: '62vh',
          background: '#ffffff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: '0 -6px 24px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'auto',
        }}
      >
        <div className="flex items-center justify-center pt-2 pb-1 shrink-0">
          <div style={{ width: 36, height: 5, borderRadius: 999, background: COLOR.grabber }} />
        </div>

        <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
          <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: '22px', color: '#1a1a1a', margin: 0, fontFamily: FONT }}>
            Profile
          </h2>
          <CloseCircleButton onClick={onClose} label="Close Profile" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-1 pb-2">
          <UserCard name={user.name} title={user.title} email={user.email} branch={user.branch} />

          <div className="mt-5 flex flex-col gap-1">
            <MenuRow icon={UserCog} title="Account Settings" subtitle="Edit your profile, password and preferences here" onClick={onAccountSettings} />
            <MenuRow icon={BellRing} title="Notification Preferences" subtitle="Adjust your notifications here" onClick={onNotificationPreferences} />
            <MenuRow icon={HelpCircle} title="Coconut Support | Help" subtitle="Help documentation and more" onClick={onSupport} />
          </div>
        </div>

        <div className="px-4 pt-2 pb-5 shrink-0">
          <PrimaryButton onClick={onLogout}>
            <LogOut size={18} strokeWidth={2} />
            Log out
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}