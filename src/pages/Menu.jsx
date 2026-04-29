import React, { useEffect } from 'react';
import {
  X, Calendar, Home, Video, TrendingUp, Lightbulb,
  BarChart3, IdCard, ArrowLeftRight, User, Plus,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Tokens (kept in sync with Schedule.jsx)                                   */
/* -------------------------------------------------------------------------- */

const COLOR = {
  page:         '#F5F5F5',
  welcomeBg:    '#F1F8FF',
  ctaBlue:      '#1D4ED8',
  ctaBlueHover: '#1843a8',
  fabTeal:      '#005C65',
  tealTint:     '#E6F4F4',
  textMuted:    '#5F6B7A',
  divider:      '#E5E5E5',
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
/*  Shared atoms                                                              */
/* -------------------------------------------------------------------------- */

function IconButton({ children, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  AppTile — reusable for Menu page AND Edit-Pinned sheet                    */
/* -------------------------------------------------------------------------- */

/**
 * @param {Object} props
 * @param {React.ComponentType} props.icon  - Lucide icon component
 * @param {string}              props.label
 * @param {boolean}             [props.selected] - active highlight (teal)
 * @param {boolean}             [props.pinBadge] - small pin/plus badge (used by Meeting)
 * @param {() => void}          [props.onClick]
 */
function AppTile({ icon: Icon, label, selected = false, pinBadge = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-2 w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: selected ? COLOR.tealTint : '#ffffff',
        border: selected ? `1.5px solid ${COLOR.fabTeal}` : '1px solid transparent',
        borderRadius: 20,
        padding: '14px 8px',
        minHeight: 84,
        boxShadow: selected
          ? '0 1px 3px rgba(0,0,0,0.06)'
          : '0 1px 2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        fontFamily: FONT,
      }}
    >
      <div className="relative">
        <Icon
          size={22}
          strokeWidth={1.75}
          color={selected ? COLOR.fabTeal : '#1f2937'}
        />
        {pinBadge && (
          <span
            className="absolute flex items-center justify-center"
            style={{
              top: -4, right: -6,
              width: 12, height: 12,
              borderRadius: 3,
              border: '1.5px solid currentColor',
              color: selected ? COLOR.fabTeal : '#1f2937',
              background: selected ? COLOR.tealTint : '#ffffff',
            }}
          >
            <Plus size={8} strokeWidth={3} />
          </span>
        )}
      </div>
      <span
        className="text-center"
        style={{
          fontSize: 13,
          lineHeight: '16px',
          fontWeight: 500,
          color: selected ? COLOR.fabTeal : '#1f2937',
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page sections                                                             */
/* -------------------------------------------------------------------------- */

function WelcomeCard({ name = 'Alicia', onDismiss }) {
  return (
    <section
      className="relative"
      style={{
        background: COLOR.welcomeBg,
        borderRadius: 20,
        padding: '20px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: '24px',
            color: '#0a0a0a',
            margin: 0,
            fontFamily: FONT,
          }}
        >
          Welcome, {name}
        </h2>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss welcome message"
          className="shrink-0 -mt-1 -mr-1 w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ border: '1.25px solid rgba(0,0,0,0.55)' }}
          >
            <X size={12} strokeWidth={2.25} className="text-black/70" />
          </span>
        </button>
      </div>
      <p
        style={{
          fontSize: 14,
          lineHeight: '22px',
          color: '#0a0a0a',
          marginTop: 10,
          marginBottom: 0,
          fontFamily: FONT,
        }}
      >
        Jump straight into a section of the platform below with both phone friendly
        and desktop designed pages below. Short cut to your top pinned picks.
      </p>
    </section>
  );
}

function ScheduleCard({ onView }) {
  return (
    <section
      style={{
        background: '#ffffff',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 48, height: 48,
            borderRadius: 10,
            border: `1.5px solid ${COLOR.ctaBlue}`,
            background: '#ffffff',
          }}
          aria-hidden="true"
        >
          <Calendar size={22} strokeWidth={1.75} color={COLOR.ctaBlue} />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              lineHeight: '22px',
              color: '#0a0a0a',
              margin: 0,
              fontFamily: FONT,
            }}
          >
            Schedule
          </h3>
          <p
            style={{
              fontSize: 14,
              lineHeight: '20px',
              color: '#0a0a0a',
              marginTop: 2,
              marginBottom: 0,
              fontFamily: FONT,
            }}
          >
            View your upcoming appointments for the day or week
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onView}
        className="w-full mt-4 flex items-center justify-center transition-colors active:scale-[0.99]"
        style={{
          background: COLOR.ctaBlue,
          color: '#ffffff',
          height: 44,
          borderRadius: 999,
          fontSize: 15,
          fontWeight: 500,
          fontFamily: FONT,
          letterSpacing: '0.2px',
        }}
        onMouseDown={(e) => (e.currentTarget.style.background = COLOR.ctaBlueHover)}
        onMouseUp={(e) => (e.currentTarget.style.background = COLOR.ctaBlue)}
        onMouseLeave={(e) => (e.currentTarget.style.background = COLOR.ctaBlue)}
      >
        View Schedule
      </button>
    </section>
  );
}

function SectionHeading({ children, action }) {
  return (
    <div className="flex items-center justify-between">
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          lineHeight: '20px',
          color: '#0a0a0a',
          margin: 0,
          fontFamily: FONT,
        }}
      >
        {children}
      </h3>
      {action}
    </div>
  );
}

function EditPinnedPill({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition-colors hover:brightness-95 active:scale-[0.97]"
      style={{
        background: 'rgba(118, 118, 128, 0.16)',
        color: '#0a0a0a',
        padding: '4px 12px',
        borderRadius: 999,
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: 400,
        fontFamily: FONT,
      }}
    >
      Edit Pinned
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  App tile data                                                             */
/* -------------------------------------------------------------------------- */

const PINNED_TILES = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'meeting',   label: 'Meeting',   icon: Video, pinBadge: true },
];

const OTHER_TILES = [
  { id: 'analytics',  label: 'Analytics',          icon: TrendingUp },
  { id: 'insights',   label: 'Insights',           icon: Lightbulb },
  { id: 'reports',    label: 'Reports',            icon: BarChart3,     selected: true },
  { id: 'shift',      label: 'Shift Schedule',     icon: IdCard },
  { id: 'workforce',  label: 'Workforce Planning', icon: ArrowLeftRight },
  { id: 'staff',      label: 'Staff',              icon: User },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Menu({ onClose, onTileClick, onEditPinned, onViewSchedule }) {
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
          background: COLOR.page,
        }}
      >
        {/* Close header — no sage bar on this screen */}
        <div className="flex items-center px-3 pt-3 pb-1 shrink-0">
          <IconButton label="Close menu" onClick={onClose}>
            <X size={22} strokeWidth={2} className="text-black" />
          </IconButton>
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: '4px 16px 32px' }}
        >
          <div className="flex flex-col gap-7">
            <WelcomeCard onDismiss={() => {}} />

            <div className="flex flex-col gap-3">
              <SectionHeading>Phone Ready</SectionHeading>
              <ScheduleCard onView={onViewSchedule} />
            </div>

            <div className="flex flex-col gap-3">
              <SectionHeading
                action={<EditPinnedPill onClick={onEditPinned} />}
              >
                Designed for Desktop
              </SectionHeading>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: '20px',
                  color: '#0a0a0a',
                  margin: 0,
                  fontFamily: FONT,
                }}
              >
                Pinned
              </p>

              {/* Pinned row — left-aligned 2 tiles in a 3-col grid */}
              <div className="grid grid-cols-3 gap-3">
                {PINNED_TILES.map((t) => (
                  <AppTile
                    key={t.id}
                    icon={t.icon}
                    label={t.label}
                    pinBadge={t.pinBadge}
                    onClick={() => onTileClick?.(t.id)}
                  />
                ))}
              </div>

              <div
                aria-hidden="true"
                style={{ height: 1, background: COLOR.divider, margin: '8px 0 4px' }}
              />

              {/* Other tiles — full 3-col grid */}
              <div className="grid grid-cols-3 gap-3">
                {OTHER_TILES.map((t) => (
                  <AppTile
                    key={t.id}
                    icon={t.icon}
                    label={t.label}
                    selected={t.selected}
                    onClick={() => onTileClick?.(t.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
