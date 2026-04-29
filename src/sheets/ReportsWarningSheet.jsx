import React from 'react';
import { X } from 'lucide-react';

const COLOR = {
  fabTeal:      '#005C65',
  scrim:        'rgba(0,0,0,0.35)',
  closeBtnBg:   '#E0E0E0',
  grabber:      '#CCCCCC',
};

const FONT = "'Roboto', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

function CloseCircleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="flex items-center justify-center transition-colors hover:brightness-95 active:scale-95"
      style={{ width: 40, height: 40, borderRadius: 999, background: COLOR.closeBtnBg, border: 'none', cursor: 'pointer' }}
    >
      <X size={20} strokeWidth={2} className="text-neutral-600" />
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
        background: COLOR.fabTeal, color: '#ffffff',
        height: 48, borderRadius: 999,
        fontSize: 15, fontWeight: 500, fontFamily: FONT,
        letterSpacing: '0.2px',
        boxShadow: '0 1px 2px rgba(0,92,101,0.3)',
        border: 'none', cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center transition-all active:scale-[0.99] hover:bg-teal-50"
      style={{
        background: '#ffffff',
        color: COLOR.fabTeal,
        height: 48, borderRadius: 999,
        fontSize: 15, fontWeight: 500, fontFamily: FONT,
        letterSpacing: '0.2px',
        border: `1.5px solid ${COLOR.fabTeal}`,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function ReportsWarningSheet({ onContinue, onCancel }) {
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
        onClick={onCancel}
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
          height: 'auto',
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

        <div className="flex items-center justify-end px-4 pt-2 pb-1 shrink-0">
          <CloseCircleButton onClick={onCancel} />
        </div>

        <div className="px-6 pt-2 pb-1">
          <p style={{ fontSize: 16, lineHeight: '24px', color: '#1a1a1a', margin: 0, fontFamily: FONT }}>
            You are about to enter a [page] that is heavily optimized for desktop viewing and interaction and might prove difficult to navigate.
          </p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: '#1a1a1a', margin: '20px 0 0', fontFamily: FONT }}>
            This might provide a poorer experience on a mobile device.
          </p>
        </div>

        <div className="px-6 pt-6 pb-6 shrink-0 flex flex-col gap-3">
          <PrimaryButton onClick={onContinue}>Continue Anyway</PrimaryButton>
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        </div>
      </div>
    </div>
  );
}