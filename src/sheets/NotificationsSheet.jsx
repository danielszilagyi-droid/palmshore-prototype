import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const COLOR = {
  fabTeal: '#005C65',
  newBg: '#E6F4F4',
  olderBg: '#F0F0F0',
  scrim: 'rgba(0,0,0,0.40)',
  closeBtnBg: '#E0E0E0',
  grabber: '#CCCCCC',
  chipBg: '#EFEFEF',
  chipText: '#1a1a1a',
};

const FONT = "'Roboto', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const h = React.createElement;

const NOTIFICATIONS = [
  { id: 1, message: 'A new person is waiting in the Lobby for Home Line of Credit.', time: '1 day ago', unread: true, group: 'new', category: 'Lobby' },
  { id: 2, message: 'A new person is waiting in the Lobby for Notary.', time: '2 days ago', unread: true, group: 'new', category: 'Lobby' },
  { id: 3, message: 'A new person is waiting in the Lobby for Notary.', time: '2 days ago', unread: true, group: 'new', category: 'Lobby' },
  { id: 4, message: 'A new person is waiting in the Lobby for Home Line of Credit.', time: '6 day ago', unread: false, group: 'older', category: 'Lobby' },
];

function CloseCircleButton(props) {
  return h('button', {
    type: 'button',
    onClick: props.onClick,
    'aria-label': 'Close',
    style: { width: 40, height: 40, borderRadius: 999, background: COLOR.closeBtnBg, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }, h(X, { size: 18, strokeWidth: 2, color: '#525252' }));
}

function FilterChip(props) {
  const active = props.active;
  return h('button', {
    type: 'button',
    onClick: props.onClick,
    style: {
      background: active ? COLOR.fabTeal : COLOR.chipBg,
      color: active ? '#ffffff' : COLOR.chipText,
      border: 'none',
      borderRadius: 999,
      padding: '6px 14px',
      fontSize: 14,
      fontWeight: 500,
      fontFamily: FONT,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'background 0.15s',
    }
  }, props.label);
}

function NotificationRow(props) {
  const bg = props.unread ? COLOR.newBg : COLOR.olderBg;
  return h('div', {
    style: { background: bg, borderRadius: 12, padding: '12px 16px', fontFamily: FONT }
  },
    h('p', {
      style: { fontSize: 15, lineHeight: '21px', color: '#1a1a1a', margin: 0, fontWeight: 400 }
    }, props.message),
    h('p', {
      style: { fontSize: 12, lineHeight: '16px', color: '#5a5a5a', margin: '4px 0 0', fontWeight: 400 }
    }, props.time)
  );
}

function PrimaryButton(props) {
  return h('button', {
    type: 'button',
    onClick: props.onClick,
    style: { background: COLOR.fabTeal, color: '#ffffff', height: 48, borderRadius: 999, fontSize: 15, fontWeight: 500, fontFamily: FONT, border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 1px 2px rgba(0,92,101,0.3)' }
  }, props.children);
}

export default function NotificationsSheet(props) {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter(function (n) {
    if (filter === 'all') return true;
    if (filter === 'unread') return n.unread;
    if (filter === 'reports') return n.category === 'Reports';
    if (filter === 'lobby') return n.category === 'Lobby';
    return true;
  });

  const newItems = filtered.filter(function (n) { return n.group === 'new'; });
  const olderItems = filtered.filter(function (n) { return n.group === 'older'; });

  function markAllAsRead() {
    setNotifications(notifications.map(function (n) {
      return Object.assign({}, n, { unread: false });
    }));
  }

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread (' + notifications.filter(function (n) { return n.unread; }).length + ')' },
    { id: 'reports', label: 'Reports' },
    { id: 'lobby', label: 'Lobby' },
  ];

  return h('div', {
    style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, fontFamily: FONT, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pointerEvents: 'none' }
  },
    h('button', {
      type: 'button',
      'aria-label': 'Dismiss sheet',
      onClick: props.onClose,
      style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: COLOR.scrim, border: 'none', padding: 0, cursor: 'default', pointerEvents: 'auto' }
    }),
    h('div', {
      style: { position: 'relative', width: '100%', maxWidth: 402, height: '78vh', maxHeight: '92vh', background: '#ffffff', borderTopLeftRadius: 16, borderTopRightRadius: 16, boxShadow: '0 -6px 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', pointerEvents: 'auto' }
    },
      h('div', { style: { display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4, flexShrink: 0 } },
        h('div', { style: { width: 36, height: 5, borderRadius: 999, background: COLOR.grabber } })
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 12px', flexShrink: 0 } },
        h('h2', { style: { fontSize: 18, fontWeight: 700, lineHeight: '24px', color: '#1a1a1a', margin: 0, fontFamily: FONT } },
          'Notifications (' + notifications.length + ')'
        ),
        h(CloseCircleButton, { onClick: props.onClose })
      ),
      h('div', {
        style: { display: 'flex', gap: 8, padding: '0 16px 16px', overflowX: 'auto', flexShrink: 0 }
      },
        filters.map(function (f) {
          return h(FilterChip, {
            key: f.id,
            label: f.label,
            active: filter === f.id,
            onClick: function () { setFilter(f.id); }
          });
        })
      ),
      h('div', { style: { flex: 1, overflowY: 'auto', padding: '0 16px 8px' } },
        newItems.length > 0 && h('div', { key: 'new-section' },
          h('h3', { style: { fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px', fontFamily: FONT } }, 'New'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 } },
            newItems.map(function (n) {
              return h(NotificationRow, { key: n.id, message: n.message, time: n.time, unread: true });
            })
          )
        ),
        olderItems.length > 0 && h('div', { key: 'older-section' },
          h('h3', { style: { fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px', fontFamily: FONT } }, 'Older'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
            olderItems.map(function (n) {
              return h(NotificationRow, { key: n.id, message: n.message, time: n.time, unread: false });
            })
          )
        ),
        filtered.length === 0 && h('div', {
          style: { padding: '40px 16px', textAlign: 'center', color: '#5a5a5a', fontSize: 14, fontFamily: FONT }
        }, 'No notifications match this filter')
      ),
      h('div', { style: { padding: '12px 16px 20px', flexShrink: 0 } },
        h(PrimaryButton, { onClick: markAllAsRead },
          h(Check, { size: 18, strokeWidth: 2.5 }),
          ' Mark all as read'
        )
      )
    )
  );
}
