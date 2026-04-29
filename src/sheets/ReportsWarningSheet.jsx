import React, { useEffect } from 'react';
import {
  X, ChevronLeft, ChevronRight, ChevronDown, Bell, Plus,
  LayoutDashboard, Calendar, Video, Lightbulb, TrendingUp,
  BarChart3, Users, UsersRound, Award, Building2, User,
  MapPin, Briefcase, Clock, Zap, Settings, ArrowUpDown,
  HelpCircle, LifeBuoy, ExternalLink, MoreVertical, Download,
  CheckCircle2,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Tokens                                                                    */
/* -------------------------------------------------------------------------- */

const COLOR = {
  fabTeal:      '#005C65',
  tealTint:     '#E6F4F4',
  scrim:        'rgba(0,0,0,0.35)',
  closeBtnBg:   '#E0E0E0',
  grabber:      '#CCCCCC',

  // Reports peek
  topBarDark:    '#0E3A3F',
  sidebarBg:     '#F4F4F4',
  sidebarText:   '#3A3A3A',
  sidebarMuted:  '#8A8A8A',
  sidebarHover:  'rgba(0,0,0,0.04)',
  sidebarActive: 'rgba(0,92,101,0.10)',
  tableBorder:   '#EAEAEA',
  statusGreen:   '#1F9D55',
};

const FONT = "'Roboto', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

const ROBOTO_HREF =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Source+Serif+Pro:wght@900&display=swap';

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
          boxShadow: '0 -6px 24px rgba(0,0,0,0.12)',
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
      <X size={20} strokeWidth={2} className="text-neutral-600" />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Buttons                                                                   */
/* -------------------------------------------------------------------------- */

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

function SecondaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center transition-all active:scale-[0.99] hover:bg-teal-50"
      style={{
        background: '#ffffff',
        color: COLOR.fabTeal,
        height: 48,
        borderRadius: 999,
        fontSize: 15,
        fontWeight: 500,
        fontFamily: FONT,
        letterSpacing: '0.2px',
        border: `1.5px solid ${COLOR.fabTeal}`,
      }}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reports Desktop Peek (static background)                                  */
/* -------------------------------------------------------------------------- */

function PalmshoreLogo() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 22, height: 22,
          background: '#D9D9D9',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            width: 16, height: 16,
            borderRadius: '50%',
            background: COLOR.topBarDark,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', left: 1.5, right: 1.5, top: 9,
            height: 1, background: '#D9D9D9',
          }} />
          <div style={{
            position: 'absolute', left: 1.5, right: 1.5, top: 11,
            height: 1, background: '#D9D9D9',
          }} />
          <div style={{
            position: 'absolute', left: 1.5, right: 1.5, top: 13,
            height: 1, background: '#D9D9D9',
          }} />
        </div>
      </div>
      <div className="flex flex-col" style={{ lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Source Serif Pro', serif",
            fontWeight: 900,
            fontSize: 13,
            color: '#ffffff',
            letterSpacing: '0.3px',
          }}
        >
          Palmshore
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 7,
            color: '#ffffff',
            letterSpacing: '1.5px',
            marginTop: 1,
          }}
        >
          FINANCIAL
        </span>
      </div>
    </div>
  );
}

function DesktopTopBar() {
  return (
    <div
      className="flex items-center justify-between px-3 shrink-0"
      style={{ height: 36, background: COLOR.topBarDark }}
    >
      <div className="flex items-center gap-2">
        <button
          aria-label="Back"
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <ChevronLeft size={14} className="text-white" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span
          style={{
            color: '#ffffff', fontSize: 11, fontFamily: FONT, fontWeight: 400,
          }}
        >
          Online Booking
        </span>
        <div className="relative">
          <Bell size={14} className="text-white" />
          <span
            className="absolute flex items-center justify-center text-white"
            style={{
              top: -6, right: -10,
              minWidth: 18, height: 13,
              borderRadius: 999,
              background: '#E03B3B',
              fontSize: 8,
              fontWeight: 700,
              padding: '0 4px',
              fontFamily: FONT,
            }}
          >
            99+
          </span>
        </div>
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 22, height: 22,
            background: '#ffffff',
            border: '1.5px solid #ffffff',
          }}
        >
          <User size={12} className="text-neutral-700" />
        </div>
      </div>
    </div>
  );
}

const SIDEBAR_ITEMS = [
  { label: 'Dashboard',        icon: LayoutDashboard },
  { label: 'Schedule',         icon: Calendar },
  { label: 'Start a Meeting',  icon: Video, external: true },
  { label: 'Insights',         icon: Lightbulb },
  { label: 'Analytics',        icon: TrendingUp },
  { label: 'Reports',          icon: BarChart3, active: true },
  { label: 'Clients',          icon: Users },
  { label: 'Staff Groups',     icon: UsersRound },
  { label: 'Points',           icon: Award },
  { label: 'Meeting Spaces',   icon: Building2 },
  { label: 'Staff',            icon: User },
  { label: 'Locations',        icon: MapPin },
  { label: 'Services',         icon: Briefcase },
  { label: 'Hours',            icon: Clock },
  { label: 'Shortcuts',        icon: Zap },
  { label: 'Settings',         icon: Settings },
  { label: 'Import/Export',    icon: ArrowUpDown },
  { label: 'Help Information', icon: HelpCircle },
  { label: 'Coconut Support',  icon: LifeBuoy },
];

function DesktopSidebar() {
  return (
    <aside
      className="shrink-0 flex flex-col"
      style={{
        width: 110,
        background: COLOR.sidebarBg,
        borderRight: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="px-2 pt-2 pb-1">
        <button
          className="flex items-center gap-1 text-[8px]"
          style={{ color: COLOR.sidebarText, fontFamily: FONT }}
        >
          Change <ChevronDown size={8} />
        </button>
      </div>

      <div className="px-2 pt-1 pb-2">
        <button
          className="w-full flex items-center justify-center gap-1 transition-colors"
          style={{
            background: COLOR.fabTeal,
            color: '#ffffff',
            height: 24,
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 500,
            fontFamily: FONT,
          }}
        >
          <Plus size={11} strokeWidth={2.5} /> New
        </button>
      </div>

      <nav className="flex-1 overflow-hidden px-1 py-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-1.5 px-1.5 py-1 rounded"
              style={{
                background: item.active ? COLOR.sidebarActive : 'transparent',
                color: item.active ? '#1a1a1a' : COLOR.sidebarText,
              }}
            >
              <Icon
                size={11}
                strokeWidth={1.75}
                color={item.active ? COLOR.fabTeal : COLOR.sidebarMuted}
              />
              <span
                style={{
                  fontSize: 8.5,
                  fontFamily: FONT,
                  fontWeight: item.active ? 700 : 400,
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.label}
              </span>
              {item.external && (
                <ExternalLink size={8} className="text-neutral-400 shrink-0" />
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function DesktopMain() {
  const dates = [
    '2026-04-01 12:00:21 AM',
    '2026-03-31 12:00:17 AM',
    '2026-03-30 12:00:21 AM',
    '2026-03-29 12:00:20 AM',
    '2026-03-28 12:00:20 AM',
    '2026-03-27 12:00:20 AM',
    '2026-03-26 12:00:22 AM',
    '2026-03-25 12:00:15 AM',
    '2026-03-24 12:00:21 AM',
  ];

  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Page header */}
      <div
        className="flex items-center justify-between px-3 py-2 shrink-0"
        style={{ borderBottom: `1px solid ${COLOR.tableBorder}` }}
      >
        <h1
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#1a1a1a',
            margin: 0,
            fontFamily: FONT,
          }}
        >
          Reports
        </h1>
        <button
          className="flex items-center gap-1"
          style={{
            background: COLOR.fabTeal,
            color: '#ffffff',
            height: 22,
            borderRadius: 4,
            padding: '0 8px',
            fontSize: 10,
            fontWeight: 500,
            fontFamily: FONT,
          }}
        >
          <Plus size={10} strokeWidth={2.5} /> New
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex shrink-0 px-3"
        style={{ borderBottom: `1px solid ${COLOR.tableBorder}` }}
      >
        <div
          className="py-1.5 mr-4 relative"
          style={{
            fontSize: 9,
            fontWeight: 500,
            color: COLOR.fabTeal,
            fontFamily: FONT,
          }}
        >
          Generated Reports
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ height: 2, background: COLOR.fabTeal }}
          />
        </div>
        <div
          className="py-1.5"
          style={{
            fontSize: 9,
            fontWeight: 400,
            color: COLOR.sidebarText,
            fontFamily: FONT,
          }}
        >
          Report Templates
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 px-3 py-1 shrink-0">
        <span
          style={{ fontSize: 8, color: COLOR.sidebarText, fontFamily: FONT }}
        >
          1-50 of 805
        </span>
        <button className="w-3 h-3 flex items-center justify-center rounded">
          <ChevronLeft size={8} className="text-neutral-500" />
        </button>
        <button className="w-3 h-3 flex items-center justify-center rounded">
          <ChevronRight size={8} className="text-neutral-500" />
        </button>
        <div
          className="flex items-center gap-1 ml-2 px-1 py-0.5 rounded"
          style={{ border: `1px solid ${COLOR.tableBorder}` }}
        >
          <span
            style={{ fontSize: 7, color: COLOR.sidebarMuted, fontFamily: FONT }}
          >
            Per page
          </span>
          <span
            style={{ fontSize: 8, color: COLOR.sidebarText, fontFamily: FONT, fontWeight: 500 }}
          >
            50
          </span>
          <ChevronDown size={8} className="text-neutral-500" />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        <div
          className="grid items-center px-3 py-1.5 shrink-0"
          style={{
            gridTemplateColumns: '1.1fr 1fr 1fr 1fr 1fr 16px',
            gap: 6,
            fontSize: 8,
            fontWeight: 500,
            color: COLOR.sidebarText,
            fontFamily: FONT,
            borderBottom: `1px solid ${COLOR.tableBorder}`,
          }}
        >
          {['Report Type', 'Template Name', 'Created At', 'Status', 'Actions'].map((h) => (
            <span key={h} className="flex items-center gap-0.5">
              {h} <ChevronDown size={7} />
            </span>
          ))}
          <Plus size={9} className="text-neutral-400" />
        </div>

        {dates.map((d, i) => (
          <div
            key={i}
            className="grid items-center px-3 py-1.5"
            style={{
              gridTemplateColumns: '1.1fr 1fr 1fr 1fr 1fr 16px',
              gap: 6,
              fontSize: 8,
              color: COLOR.sidebarText,
              fontFamily: FONT,
              borderBottom: `1px solid ${COLOR.tableBorder}`,
              minHeight: 24,
            }}
          >
            <span style={{ fontWeight: 400 }}>CustomReport</span>
            <span>sample report</span>
            <span style={{ color: COLOR.sidebarMuted, fontSize: 7.5 }}>{d}</span>
            <span className="flex items-center gap-0.5" style={{ color: COLOR.statusGreen }}>
              <CheckCircle2 size={9} /> Completed
            </span>
            <span
              className="flex items-center justify-center gap-0.5"
              style={{
                border: `1px solid ${COLOR.tableBorder}`,
                borderRadius: 3,
                padding: '1px 4px',
                fontSize: 7,
                color: COLOR.sidebarText,
                background: '#FAFAFA',
              }}
            >
              <Download size={8} /> Downloa
            </span>
            <MoreVertical size={8} className="text-neutral-400" />
          </div>
        ))}
      </div>
    </main>
  );
}

function ReportsPeek() {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: '#ffffff' }}
      aria-hidden="true"
    >
      <DesktopTopBar />
      <div className="flex-1 flex overflow-hidden">
        <DesktopSidebar />
        <DesktopMain />
      </div>

      {/* Palmshore brand header sits inside topbar — render here so its
          absolute layout isn't constrained */}
      <div className="absolute top-0 left-0 px-3 flex items-center" style={{ height: 36 }}>
        <PalmshoreLogo />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sheet contents                                                            */
/* -------------------------------------------------------------------------- */

function ReportsWarningContent({ onContinue, onCancel }) {
  return (
    <>
      {/* Header — close X only, no title */}
      <div className="flex items-center justify-end px-4 pt-2 pb-1 shrink-0">
        <CloseCircleButton onClick={onCancel} label="Cancel and close" />
      </div>

      {/* Body */}
      <div className="px-6 pt-2 pb-1">
        <p
          style={{
            fontSize: 16,
            lineHeight: '24px',
            color: '#1a1a1a',
            margin: 0,
            fontFamily: FONT,
          }}
        >
          You are about to enter a [page] that is heavily optimized for desktop
          viewing and interaction and might prove difficult to navigate.
        </p>
        <p
          style={{
            fontSize: 16,
            lineHeight: '24px',
            color: '#1a1a1a',
            margin: '20px 0 0',
            fontFamily: FONT,
          }}
        >
          This might provide a poorer experience on a mobile device.
        </p>
      </div>

      {/* Button stack */}
      <div className="px-6 pt-6 pb-6 shrink-0 flex flex-col gap-3">
        <PrimaryButton onClick={onContinue}>Continue Anyway</PrimaryButton>
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ReportsWarningSheet({ onContinue, onCancel }) {
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
          background: '#ffffff',
        }}
      >
        <ReportsPeek />

        <BottomSheet onDismiss={onCancel} heightHint="50%">
          <ReportsWarningContent
            onContinue={onContinue}
            onCancel={onCancel}
          />
        </BottomSheet>
      </div>
    </div>
  );
}
