import React, { useEffect } from 'react';
import {
  X, Home, Lightbulb, BarChart3, Video, TrendingUp,
  Plus, Pin,
} from 'lucide-react';

const COLOR = {
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
          cursor: 'pointer',
        }}
      >
        <span className="flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: 999, border: `1.25px dashed ${COLOR.emptyBorder}` }}>
          <Plus size={12} strokeWidth={2} color={COLOR.emptyBorder} />
        </span>
        <span style={{ fontSize: 13, lineHeight: '16px', color: COLOR.mutedText }}>Empty Slot</span>
      </button>
    );
  }

  const styleMap = {
    pinned: { background: COLOR.tealTint, border: `1.5px solid ${COLOR.pinnedBorder}`, color: COLOR.fabTeal, iconColor: COLOR.fabTeal },
    active: { background: COLOR.tealTint, border: `1.5px solid ${COLOR.fabTeal}`, color: COLOR.fabTeal, iconColor: COLOR.fabTeal },
    muted:  { background: COLOR.mutedBg, border: '1.5px solid transparent', color: COLOR.mutedText, iconColor: COLOR.mutedText },
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
        cursor: 'pointer',
      }}
    >
      {badge && (
        <span
          className="absolute flex items-center justify-center"
          style={{
            top: 8, right: 8, width: 18, height: 18, borderRadius: 5,
            background: variant === 'muted' ? '#BFBFBF' : COLOR.fabTeal,
            color: '#ffffff',
          }}
        >
          {badge === 'pin' ? <Pin size={10} strokeWidth={2} fill="#ffffff" color="#ffffff" /> : <Plus size={11} strokeWidth={2.5} />}
        </span>
      )}
      {Icon && <Icon size={22} strokeWidth={1.75} color={s.iconColor} />}
      <span style={{ fontSize: 13, lineHeight: '16px', fontWeight: 500 }}>{label}</span>
    </button>
  );
}

function CloseCircleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="flex items-center justify-center transition-colors hover:brightness-95 active:scale-95"
      style={{ width: 40, height: 40, borderRadius: 999, background: COLOR.closeBtnBg, border: 'none', cursor: 'pointer' }}
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
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

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

export default function EditPinnedSheet({ onClose, onSave }) {
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
      <button
        type="button"
        aria-label="Dismiss sheet"
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: COLOR.scrim, border: 'none', padding: 0, cursor: 'default',
          pointerEvents: 'auto',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 402,
          height: '86vh',
          maxHeight: '92vh',
          background: '#ffffff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: '0 -6px 24px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'auto',
        }}
      >
        <div className="flex items-center justify-center pt-2 pb-1 shrink-0">
          <div style={{ width: 36, height: 5, borderRadius: 999, background: COLOR.grabber }} />
        </div>

        <div className="flex items-start justify-between px-4 pt-3 pb-2 shrink-0">
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: '22px', color: '#1a1a1a', margin: 0, fontFamily: FONT }}>
              Edit Pinned
            </h2>
            <p style={{ fontSize: 14, lineHeight: '20px', color: '#1a1a1a', margin: '6px 0 0', fontFamily: FONT }}>
              Pick up to 3 tiles
            </p>
          </div>
          <CloseCircleButton onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Pin size={18} strokeWidth={1.75} className="text-black -rotate-45" />
              <span style={{ fontSize: 16, fontWeight: 500, fontFamily: FONT, color: '#1a1a1a' }}>Pinned</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 500, fontFamily: FONT, color: '#1a1a1a' }}>2/3</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {PINNED_SLOTS.map((slot) =>
              slot.filled ? (
                <AppTile key={slot.id} icon={slot.icon} label={slot.label} variant="pinned" badge="pin" />
              ) : (
                <AppTile key={slot.id} variant="empty" />
              )
            )}
          </div>

          <p className="text-center" style={{ fontSize: 12, lineHeight: '18px', color: '#1a1a1a', marginTop: 12, marginBottom: 0, fontFamily: FONT }}>
            Tap a pinned tile to unpin · Tap any tile below to pin
          </p>

          <div style={{ height: 20 }} />

          <div className="grid grid-cols-3 gap-3">
            {AVAILABLE_TILES.map((t) => (
              <AppTile key={t.id} icon={t.icon} label={t.label} variant={t.variant || 'muted'} badge={t.badge} />
            ))}
          </div>

          <div style={{ height: 16 }} />
        </div>

        <div className="px-4 pt-3 pb-5 shrink-0" style={{ borderTop: '1px solid #f0f0f0' }}>
          <PrimaryButton onClick={onSave}>Save</PrimaryButton>
        </div>
      </div>
    </div>
  );
}