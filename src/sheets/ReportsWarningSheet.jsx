import React from 'react';
import { X } from 'lucide-react';

const COLOR = {
  fabTeal: '#005C65',
  scrim: 'rgba(0,0,0,0.35)',
  closeBtnBg: '#E0E0E0',
  grabber: '#CCCCCC',
};

const FONT = "'Roboto', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const h = React.createElement;

function CloseCircleButton(props) {
  return h('button', {
    type: 'button',
    onClick: props.onClick,
    'aria-label': 'Close',
    style: { width: 40, height: 40, borderRadius: 999, background: COLOR.closeBtnBg, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }, h(X, { size: 20, strokeWidth: 2, color: '#525252' }));
}

function PrimaryButton(props) {
  return h('button', {
    type: 'button',
    onClick: props.onClick,
    style: { background: COLOR.fabTeal, color: '#ffffff', height: 48, borderRadius: 999, fontSize: 15, fontWeight: 500, fontFamily: FONT, border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,92,101,0.3)' }
  }, props.children);
}

function SecondaryButton(props) {
  return h('button', {
    type: 'button',
    onClick: props.onClick,
    style: { background: '#ffffff', color: COLOR.fabTeal, height: 48, borderRadius: 999, fontSize: 15, fontWeight: 500, fontFamily: FONT, border: '1.5px solid ' + COLOR.fabTeal, cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }, props.children);
}

export default function ReportsWarningSheet(props) {
  return h('div', {
    style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, fontFamily: FONT, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pointerEvents: 'none' }
  },
    h('button', {
      type: 'button',
      'aria-label': 'Dismiss sheet',
      onClick: props.onCancel,
      style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: COLOR.scrim, border: 'none', padding: 0, cursor: 'default', pointerEvents: 'auto' }
    }),
    h('div', {
      style: { position: 'relative', width: '100%', maxWidth: 402, maxHeight: '92vh', background: '#ffffff', borderTopLeftRadius: 16, borderTopRightRadius: 16, boxShadow: '0 -6px 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', pointerEvents: 'auto' }
    },
      h('div', { style: { display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4, flexShrink: 0 } },
        h('div', { style: { width: 36, height: 5, borderRadius: 999, background: COLOR.grabber } })
      ),
      h('div', { style: { display: 'flex', justifyContent: 'flex-end', padding: '8px 16px 4px', flexShrink: 0 } },
        h(CloseCircleButton, { onClick: props.onCancel })
      ),
      h('div', { style: { padding: '8px 24px 4px' } },
        h('p', { style: { fontSize: 16, lineHeight: '24px', color: '#1a1a1a', margin: 0, fontFamily: FONT } },
          'You are about to enter a [page] that is heavily optimized for desktop viewing and interaction and might prove difficult to navigate.'
        ),
        h('p', { style: { fontSize: 16, lineHeight: '24px', color: '#1a1a1a', margin: '20px 0 0', fontFamily: FONT } },
          'This might provide a poorer experience on a mobile device.'
        )
      ),
      h('div', { style: { padding: '24px 24px 24px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 } },
        h(PrimaryButton, { onClick: props.onContinue }, 'Continue Anyway'),
        h(SecondaryButton, { onClick: props.onCancel }, 'Cancel')
      )
    )
  );
}
