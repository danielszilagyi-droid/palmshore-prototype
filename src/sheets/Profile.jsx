import React, { useEffect } from 'react';
import {
  X, Grid3x3, Bell, ChevronDown, MoreVertical,
  UserCog, BellRing, HelpCircle, LogOut,
  Video, Phone,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Tokens                                                                    */
/* -------------------------------------------------------------------------- */

const COLOR = {
  topNav:       '#ECF4F4',
  fabTeal:      '#005C65',
  tealTint:     '#E6F4F4',
  iconCircle:   '#D4ECEC',
  emailLink:    '#0F6E9C',
  eventGreen:   '#C8F1CF',
  nowRed:       '#E95A58',
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

/* -------------------------------------------------------------------------- */
/*  Reusable BottomSheet shell                                                */
/* -------------------------------------------------------------------------- */

function BottomSheet({ children, onDismiss, heightHint }) {
  return (
    <>
      <button
        type="button"
        aria-label="Dismiss sheet"
        onClick={onDismiss}
        className="absolute inset-0 z-10"
        style={{ background: COLOR.scrim, cursor: 'default' }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 z-20 flex flex-col bg-white"
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: heightHint || 'auto',
          maxHeight: '92%',
          boxShadow: '0 -6px 24px rgba(0,0,0,0.15)',
        }}
      >
        <div className="flex items-center justify-center pt-2 pb-1 shrink-0">
          <div
            style={{ width: 36, height: 5, borderRadius: 999, background: COLOR.grabber }}
          />
        </div>
        {children}
      </div>
    </>
  );
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
      }}
    >
      <X size={18} strokeWidth={2} className="text-neutral-600" />
    </button>
  );
}

function SheetHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
      <h2
        style={{
          fontSize: 17,
          fontWeight: 700,
          lineHeight: '22px',
          color: '#1a1a1a',
          margin: 0,
          fontFamily: FONT,
        }}
      >
        {title}
      </h2>
      <CloseCircleButton onClick={onClose} label={`Close ${title}`} />
    </div>
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
      }}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Schedule peek (static background — shared with Notifications)             */
/* -------------------------------------------------------------------------- */

function PeekAvatar() {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 ring-1 ring-black/5"
      style={{
        background: 'linear-gradient(135deg, #4a5d52 0%, #2d3a33 100%)',
        fontSize: 13,
        fontWeight: 500,
        fontFamily: FONT,
      }}
    >
      AM
    </div>
  );
}

function SchedulePeek() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: '#ffffff', fontFamily: FONT }}
      aria-hidden="true"
    >
      {/* Top bar */}
      <div
        className="h-16 flex items-center justify-between px-4 shrink-0"
        style={{ background: COLOR.topNav }}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          <Grid3x3 size={22} strokeWidth={2.5} className="text-slate-800" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <Bell size={22} className="text-slate-800" />
          </div>
          <PeekAvatar />
        </div>
      </div>

      {/* Date header */}
      <div
        className="h-16 bg-white flex items-center justify-between px-4 shrink-0 relative"
        style={{ boxShadow: '0 3px 7px rgba(0,0,0,0.06)', borderBottom: '1px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 20, fontWeight: 500, lineHeight: '24px', color: '#000' }}>
            Wed Mar 11
          </span>
          <ChevronDown size={22} className="text-slate-500" strokeWidth={2} />
        </div>
        <MoreVertical size={22} className="text-slate-500" />
      </div>

      {/* Texture strip */}
      <div
        style={{
          height: 28,
          background: '#EFEFEF',
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0 6px, rgba(0,0,0,0.045) 6px 7px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      />

      {/* Calendar slice */}
      <div className="relative" style={{ height: 280 }}>
        {/* Time labels */}
        {[
          { label: '9am',  top: 39 },
          { label: '10am', top: 121 },
          { label: '11am', top: 203 },
        ].map(({ label, top }) => (
          <div
            key={label}
            className="absolute text-right pr-3"
            style={{
              top,
              left: 0,
              width: 68,
              fontSize: 14,
              color: 'rgba(0,0,0,0.45)',
            }}
          >
            {label}
          </div>
        ))}

        {/* Hour dividers */}
        {[49, 131, 213].map((top) => (
          <div
            key={top}
            className="absolute"
            style={{
              top, left: 68, right: 0,
              height: 1,
              background: 'rgba(0,0,0,0.08)',
            }}
          />
        ))}

        {/* Susan Taylor event — 9am */}
        <div
          className="absolute rounded-lg flex gap-2"
          style={{
            top: 49, left: 90, right: 16, height: 80,
            background: COLOR.eventGreen,
            border: '1px solid #ffffff',
            padding: '4px 6px',
            fontSize: 12,
            lineHeight: '15px',
            color: 'rgba(0,0,0,0.9)',
          }}
        >
          <Video size={14} className="mt-0.5 shrink-0" />
          <div>
            <div style={{ fontWeight: 500 }}>Susan Taylor</div>
            <div style={{ marginTop: 2 }}>9:00am - 10:00am</div>
            <div style={{ marginTop: 2 }}>Wealth Planning</div>
          </div>
        </div>

        {/* Ahmad Pasrand event — 10am */}
        <div
          className="absolute rounded-lg flex gap-2"
          style={{
            top: 131, left: 90, right: 16, height: 60,
            background: COLOR.eventGreen,
            border: '1px solid #ffffff',
            padding: '4px 6px',
            fontSize: 12,
            lineHeight: '15px',
            color: 'rgba(0,0,0,0.9)',
          }}
        >
          <Phone size={14} className="mt-0.5 shrink-0" />
          <div>
            <div style={{ fontWeight: 500 }}>Ahmad Pasrand</div>
            <div style={{ marginTop: 2 }}>10:00am - 10:45am</div>
            <div style={{ marginTop: 2 }}>Wealth Planning</div>
          </div>
        </div>

        {/* Now indicator (~10:30am) */}
        <div
          className="absolute"
          style={{ top: 172, left: 64, right: 0, height: 0 }}
        >
          <div
            className="absolute"
            style={{
              left: 0, top: -4,
              width: 8, height: 8,
              borderRadius: '50%',
              background: COLOR.nowRed,
            }}
          />
          <div
            style={{
              marginLeft: 8,
              height: 1,
              background: COLOR.nowRed,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Profile-specific pieces                                                   */
/* -------------------------------------------------------------------------- */

function UserAvatar({ size = 56 }) {
  // Larger version of the gradient avatar used elsewhere
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
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: '24px',
              color: '#0a0a0a',
              margin: 0,
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '22px',
              color: '#0a0a0a',
              margin: '2px 0 0',
            }}
          >
            {title}
          </p>
          <a
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
            className="hover:underline"
          >
            {email}
          </a>
          <p
            style={{
              fontSize: 14,
              lineHeight: '20px',
              color: '#0a0a0a',
              margin: '4px 0 0',
              fontWeight: 400,
            }}
          >
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
      style={{ fontFamily: FONT }}
    >
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          width: 40, height: 40,
          borderRadius: 999,
          background: COLOR.iconCircle,
        }}
      >
        <Icon size={20} strokeWidth={1.75} color={COLOR.fabTeal} />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span
          className="block"
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '22px',
            color: '#0a0a0a',
          }}
        >
          {title}
        </span>
        <span
          className="block"
          style={{
            fontSize: 13,
            lineHeight: '18px',
            color: '#5a5a5a',
            marginTop: 2,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </span>
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sheet contents                                                            */
/* -------------------------------------------------------------------------- */

function ProfileSheetContent({
  user,
  onClose,
  onAccountSettings,
  onNotificationPreferences,
  onSupport,
  onLogout,
}) {
  return (
    <>
      <SheetHeader title="Profile" onClose={onClose} />

      <div className="flex-1 overflow-y-auto px-4 pt-1 pb-2">
        <UserCard
          name={user.name}
          title={user.title}
          email={user.email}
          branch={user.branch}
        />

        <div className="mt-5 flex flex-col gap-1">
          <MenuRow
            icon={UserCog}
            title="Account Settings"
            subtitle="Edit your profile, password and preferences here"
            onClick={onAccountSettings}
          />
          <MenuRow
            icon={BellRing}
            title="Notification Preferences"
            subtitle="Adjust your notifications here"
            onClick={onNotificationPreferences}
          />
          <MenuRow
            icon={HelpCircle}
            title="Coconut Support | Help"
            subtitle="Help documentation and more"
            onClick={onSupport}
          />
        </div>
      </div>

      <div className="px-4 pt-2 pb-5 shrink-0">
        <PrimaryButton onClick={onLogout}>
          <LogOut size={18} strokeWidth={2} />
          Log out
        </PrimaryButton>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

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
      className="min-h-screen flex items-stretch sm:items-center justify-center sm:p-6"
      style={{
        fontFamily: FONT,
        background:
          'radial-gradient(circle at 20% 0%, #cfd6dc 0%, #b8c0c8 60%, #a7afb8 100%)',
      }}
    >
      <div
        className="relative w-full flex flex-col overflow-hidden sm:rounded-[28px] sm:shadow-2xl"
        style={{
          maxWidth: 402,
          minHeight: 'min(874px, 100vh)',
          background: '#F7F9FA',
        }}
      >
        <SchedulePeek />

        <BottomSheet onDismiss={onClose} heightHint="62%">
          <ProfileSheetContent
            user={user}
            onClose={onClose}
            onAccountSettings={onAccountSettings}
            onNotificationPreferences={onNotificationPreferences}
            onSupport={onSupport}
            onLogout={onLogout}
          />
        </BottomSheet>
      </div>
    </div>
  );
}
