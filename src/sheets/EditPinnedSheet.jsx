import React, { useEffect } from 'react';
import {
  X, Home, Lightbulb, BarChart3, Video, TrendingUp,
  Plus, Pin,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Tokens (kept in sync with Schedule.jsx & Menu.jsx)                        */
/* -------------------------------------------------------------------------- */

const COLOR = {
  page:          '#F5F5F5',
  welcomeBg:     '#F1F8FF',
  fabTeal:       '#005C65',
  tealTint:      '#E6F4F4',
  pinnedBorder:  '#A8D4C8',
  mutedBg:       '#EFEFEF',
  mutedText:     '#6B6B6B',
  emptyBorder:   '#B5B5B5',
  scrim:         'rgba(0,0,0,0.35)',
  closeBtnBg:    '#E0E0E0',
  grabber:       '#CCCCCC',
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

/**
 * Reusable bottom sheet wrapper. Sits absolutely inside its containing phone
 * shell. The shell must be `position: relative`.
 *
 * @param {Object}     props
 * @param {ReactNode}  props.children
 * @param {() => void} [props.onDismiss]  - tapping the scrim invokes this
 * @param {string}     [props.heightHint] - CSS height of the sheet (e.g. '85%')
 */
function BottomSheet({ children, onDismiss, heightHint }) {
  return (
    <>
      {/* Scrim */}
      <button
        type="button"
        aria-label="Dismiss sheet"
        onClick={onDismiss}
        className="absolute inset-0 z-10"
        style={{ background: COLOR.scrim, cursor: 'default' }}
      />

      {/* Sheet */}
      <div
        className="absolute left-0 right-0 bottom-0 z-20 flex flex-col bg-white"
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: heightHint || 'auto',
          maxHeight: '92%',
          boxShadow: '0 -6px 24px rgba(0,0,0,0.12)',
        }}
      >
        {/* Drag handle */}
        <div className="flex items-center justify-center pt-2 pb-1 shrink-0">
          <div
            style={{
              width: 36, height: 5,
              borderRadius: 999,
              background: COLOR.grabber,
            }}
          />
        </div>

        {children}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tile (Edit-Pinned variants)                                               */
/* -------------------------------------------------------------------------- */

/**
 * @param {Object} props
 * @param {React.ComponentType} [props.icon]
 * @param {string}              [props.label]
 * @param {'pinned'|'active'|'muted'|'empty'} props.variant
 * @param {'pin'|'plus'|null}   [props.badge]
 * @param {() => void}          [props.onClick]
 */
function AppTile({ icon: Icon, label, variant = 'muted', badge = null, onClick }) {
  if (variant === 'empty') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="relative flex flex-col items-center justify-center gap-2 w-full transition-transform active:scale-[0.97]"
        style={{
          background: 'transparent',
          border: `1.5px dashed ${COLOR.emptyBorder}`,
          borderRadius: 18,
          minHeight: 92,
          padding: '14px 8px',
          fontFamily: FONT,
        }}
      >
        <span
          className="flex items-center justify-center"
          style={{
            width: 24, height: 24,
            borderRadius: 999,
            border: `1.25px dashed ${COLOR.emptyBorder}`,
          }}
        >
          <Plus size={12} strokeWidth={2} color={COLOR.emptyBorder} />
        </span>
        <span style={{ fontSize: 13, lineHeight: '16px', color: COLOR.mutedText }}>
          Empty Slot
        </span>
      </button>
    );
  }

  // Visual styles per variant
  const styleMap = {
    pinned: {
      background: COLOR.tealTint,
      border:     `1.5px solid ${COLOR.pinnedBorder}`,
      color:      COLOR.fabTeal,
      iconColor:  COLOR.fabTeal,
    },
    active: {
      background: COLOR.tealTint,
      border:     `1.5px solid ${COLOR.fabTeal}`,
      color:      COLOR.fabTeal,
      iconColor:  COLOR.fabTeal,
    },
    muted: {
      background: COLOR.mutedBg,
      border:     '1.5px solid transparent',
      color:      COLOR.mutedText,
      iconColor:  COLOR.mutedText,
    },
  };
  const s = styleMap[variant] || styleMap.muted;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-2 w-full transition-transform hover:scale-[1.02] active:scale-[0.97]"
      style={{
        background: s.background,
        border: s.border,
        borderRadius: 18,
        minHeight: 92,
        padding: '14px 8px',
        color: s.color,
        fontFamily: FONT,
      }}
    >
      {badge && (
        <span
          className="absolute flex items-center justify-center"
          style={{
            top: 8, right: 8,
            width: 18, height: 18,
            borderRadius: 5,
            background: variant === 'muted' ? '#BFBFBF' : COLOR.fabTeal,
            color: '#ffffff',
          }}
        >
          {badge === 'pin' ? (
            <Pin size={10} strokeWidth={2} fill="#ffffff" color="#ffffff" />
          ) : (
            <Plus size={11} strokeWidth={2.5} />
          )}
        </span>
      )}

      {Icon && <Icon size={22} strokeWidth={1.75} color={s.iconColor} />}

      <span style={{ fontSize: 13, lineHeight: '16px', fontWeight: 500 }}>
        {label}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sheet header & primary button                                             */
/* -------------------------------------------------------------------------- */

function CloseCircleButton({ onClick, label = 'Close' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center transition-colors hover:brightness-95 active:scale-95"
      style={{
        width: 36, height: 36,
        borderRadius: 999,
        background: COLOR.closeBtnBg,
      }}
    >
      <X size={18} strokeWidth={2} className="text-neutral-600" />
    </button>
  );
}

function SheetHeader({ title, subtitle, onClose }) {
  return (
    <div className="flex items-start justify-between px-4 pt-3 pb-2">
      <div>
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
        {subtitle && (
          <p
            style={{
              fontSize: 14,
              lineHeight: '20px',
              color: '#1a1a1a',
              margin: '6px 0 0',
              fontFamily: FONT,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <CloseCircleButton onClick={onClose} label="Close edit pinned" />
    </div>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center transition-all active:scale-[0.99] hover:brightness-110"
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
/*  Menu peek (static, dimmed background)                                     */
/* -------------------------------------------------------------------------- */

function MenuPeek() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: COLOR.page, fontFamily: FONT }}
      aria-hidden="true"
    >
      <div className="px-3 pt-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <X size={22} className="text-black" strokeWidth={2} />
        </div>
      </div>

      <div className="px-4 mt-1">
        <div
          style={{
            background: COLOR.welcomeBg,
            borderRadius: 20,
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex items-start justify-between">
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#0a0a0a',
                margin: 0,
                lineHeight: '24px',
              }}
            >
              Welcome, Alicia
            </h2>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{ border: '1.25px solid rgba(0,0,0,0.55)' }}
            >
              <X size={12} strokeWidth={2.25} className="text-black/70" />
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: '22px',
              color: '#0a0a0a',
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            Jump straight into a section of the platform below with both phone
            friendly and desktop designed pages below. Short cut to your top
            pinned picks.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sheet contents                                                            */
/* -------------------------------------------------------------------------- */

const PINNED_SLOTS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home,      filled: true },
  { id: 'insights',  label: 'Insights',  icon: Lightbulb, filled: true },
  { id: 'empty',                                          filled: false },
];

const AVAILABLE_TILES = [
  { id: 'meeting-1',   label: 'Meeting',   icon: Video,       badge: 'plus' },
  { id: 'analytics-1', label: 'Analytics', icon: TrendingUp },
  { id: 'reports-1',   label: 'Reports',   icon: BarChart3,   variant: 'active' },
  { id: 'meeting-2',   label: 'Meeting',   icon: Video,       badge: 'plus' },
  { id: 'analytics-2', label: 'Analytics', icon: TrendingUp },
  { id: 'reports-2',   label: 'Reports',   icon: BarChart3 },
  { id: 'meeting-3',   label: 'Meeting',   icon: Video,       badge: 'plus' },
  { id: 'analytics-3', label: 'Analytics', icon: TrendingUp },
  { id: 'reports-3',   label: 'Reports',   icon: BarChart3 },
  { id: 'meeting-4',   label: 'Meeting',   icon: Video,       badge: 'plus' },
  { id: 'analytics-4', label: 'Analytics', icon: TrendingUp },
  { id: 'reports-4',   label: 'Reports',   icon: BarChart3 },
];

function PinnedRow() {
  return (
    <>
      {/* Section header: pin + label + counter */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Pin size={18} strokeWidth={1.75} className="text-black -rotate-45" />
          <span
            style={{ fontSize: 16, fontWeight: 500, fontFamily: FONT, color: '#1a1a1a' }}
          >
            Pinned
          </span>
        </div>
        <span
          style={{ fontSize: 16, fontWeight: 500, fontFamily: FONT, color: '#1a1a1a' }}
        >
          2/3
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {PINNED_SLOTS.map((slot) =>
          slot.filled ? (
            <AppTile
              key={slot.id}
              icon={slot.icon}
              label={slot.label}
              variant="pinned"
              badge="pin"
            />
          ) : (
            <AppTile key={slot.id} variant="empty" />
          )
        )}
      </div>

      <p
        className="text-center"
        style={{
          fontSize: 12,
          lineHeight: '18px',
          color: '#1a1a1a',
          marginTop: 12,
          marginBottom: 0,
          fontFamily: FONT,
        }}
      >
        Tap a pinned tile to unpin · Tap any tile below to pin
      </p>
    </>
  );
}

function AvailableGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {AVAILABLE_TILES.map((t) => (
        <AppTile
          key={t.id}
          icon={t.icon}
          label={t.label}
          variant={t.variant || 'muted'}
          badge={t.badge}
        />
      ))}
    </div>
  );
}

function EditPinnedSheetContent({ onClose, onSave }) {
  return (
    <>
      <SheetHeader
        title="Edit Pinned"
        subtitle="Pick up to 3 tiles"
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto px-4 pt-2">
        <PinnedRow />

        <div style={{ height: 20 }} />

        <AvailableGrid />

        <div style={{ height: 16 }} />
      </div>

      <div className="px-4 pt-3 pb-5 shrink-0" style={{ borderTop: '1px solid #f0f0f0' }}>
        <PrimaryButton onClick={onSave}>Save</PrimaryButton>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function EditPinnedSheet({ onClose, onSave }) {
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
        <MenuPeek />

        <BottomSheet onDismiss={onClose} heightHint="86%">
          <EditPinnedSheetContent
            onClose={onClose}
            onSave={onSave}
          />
        </BottomSheet>
      </div>
    </div>
  );
}
