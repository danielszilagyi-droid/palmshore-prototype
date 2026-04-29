import React, { useEffect, useMemo } from 'react';
import {
  ChevronLeft, ChevronRight, ChevronDown, Bell, Plus,
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
  fabTeal:       '#005C65',
  topBarDark:    '#0E3A3F',
  sidebarBg:     '#F4F4F4',
  sidebarText:   '#3A3A3A',
  sidebarMuted:  '#8A8A8A',
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
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function PalmshoreLogo() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{ width: 22, height: 22, background: '#D9D9D9' }}
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
          {[9, 11, 13].map((top) => (
            <div
              key={top}
              style={{
                position: 'absolute',
                left: 1.5, right: 1.5, top,
                height: 1,
                background: '#D9D9D9',
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col" style={{ lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Source Serif Pro', serif",
            fontWeight: 900, fontSize: 13,
            color: '#ffffff', letterSpacing: '0.3px',
          }}
        >
          Palmshore
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 500, fontSize: 7,
            color: '#ffffff', letterSpacing: '1.5px',
            marginTop: 1,
          }}
        >
          FINANCIAL
        </span>
      </div>
    </div>
  );
}

function DesktopTopBar({ onBack }) {
  return (
    <div
      className="flex items-center justify-between px-3 shrink-0 relative"
      style={{ height: 36, background: COLOR.topBarDark }}
    >
      <div className="flex items-center gap-2">
        <button
          aria-label="Back"
          onClick={onBack}
          className="w-6 h-6 rounded-full flex items-center justify-center hover:brightness-125 transition"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <ChevronLeft size={14} className="text-white" />
        </button>
      </div>

      <div
        className="absolute flex items-center"
        style={{ left: 36, top: 0, height: 36 }}
        aria-hidden="true"
      >
        <PalmshoreLogo />
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
              fontSize: 8, fontWeight: 700,
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

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                   */
/* -------------------------------------------------------------------------- */

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
      className="shrink-0 flex flex-col overflow-y-auto"
      style={{
        width: 110,
        background: COLOR.sidebarBg,
        borderRight: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="px-2 pt-2 pb-1">
        <button
          className="flex items-center gap-1"
          style={{
            color: COLOR.sidebarText,
            fontSize: 8,
            fontFamily: FONT,
          }}
        >
          Change <ChevronDown size={8} />
        </button>
      </div>

      <div className="px-2 pt-1 pb-2">
        <button
          className="w-full flex items-center justify-center gap-1 transition-colors hover:brightness-110"
          style={{
            background: COLOR.fabTeal,
            color: '#ffffff',
            height: 24,
            borderRadius: 999,
            fontSize: 10, fontWeight: 500,
            fontFamily: FONT,
          }}
        >
          <Plus size={11} strokeWidth={2.5} /> New
        </button>
      </div>

      <nav className="flex-1 px-1 py-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="flex items-center gap-1.5 px-1.5 py-1 rounded w-full text-left transition-colors hover:bg-black/5"
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
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main content                                                              */
/* -------------------------------------------------------------------------- */

function buildRowDates(count = 50) {
  const out = [];
  const start = new Date(2026, 3, 1); // April 1, 2026
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() - i);
    const seconds = 14 + (i * 7) % 11;
    const yyyy = d.getFullYear();
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const dd   = String(d.getDate()).padStart(2, '0');
    const ss   = String(seconds).padStart(2, '0');
    out.push(`${yyyy}-${mm}-${dd} 12:00:${ss} AM`);
  }
  return out;
}

function PageHeader() {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 shrink-0"
      style={{ borderBottom: `1px solid ${COLOR.tableBorder}` }}
    >
      <h1
        style={{
          fontSize: 14, fontWeight: 700,
          color: '#1a1a1a', margin: 0, fontFamily: FONT,
        }}
      >
        Reports
      </h1>
      <button
        className="flex items-center gap-1 transition-transform active:scale-95 hover:brightness-110"
        style={{
          background: COLOR.fabTeal,
          color: '#ffffff',
          height: 22,
          borderRadius: 4,
          padding: '0 8px',
          fontSize: 10, fontWeight: 500,
          fontFamily: FONT,
        }}
      >
        <Plus size={10} strokeWidth={2.5} /> New
      </button>
    </div>
  );
}

function Tabs({ active = 'generated', onChange }) {
  const tabs = [
    { id: 'generated', label: 'Generated Reports' },
    { id: 'templates', label: 'Report Templates' },
  ];
  return (
    <div
      className="flex shrink-0 px-3"
      style={{ borderBottom: `1px solid ${COLOR.tableBorder}` }}
    >
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange?.(t.id)}
            className="py-1.5 mr-4 relative"
            style={{
              fontSize: 9,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? COLOR.fabTeal : COLOR.sidebarText,
              fontFamily: FONT,
            }}
          >
            {t.label}
            {isActive && (
              <div
                className="absolute left-0 right-0 bottom-0"
                style={{ height: 2, background: COLOR.fabTeal }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Pagination({ start = 1, end = 50, total = 805 }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 shrink-0">
      <span style={{ fontSize: 8, color: COLOR.sidebarText, fontFamily: FONT }}>
        {start}-{end} of {total}
      </span>
      <button className="w-3 h-3 flex items-center justify-center rounded hover:bg-black/5">
        <ChevronLeft size={8} className="text-neutral-500" />
      </button>
      <button className="w-3 h-3 flex items-center justify-center rounded hover:bg-black/5">
        <ChevronRight size={8} className="text-neutral-500" />
      </button>
      <div
        className="flex items-center gap-1 ml-2 px-1 py-0.5 rounded"
        style={{ border: `1px solid ${COLOR.tableBorder}` }}
      >
        <span style={{ fontSize: 7, color: COLOR.sidebarMuted, fontFamily: FONT }}>
          Per page
        </span>
        <span
          style={{
            fontSize: 8,
            color: COLOR.sidebarText,
            fontFamily: FONT,
            fontWeight: 500,
          }}
        >
          50
        </span>
        <ChevronDown size={8} className="text-neutral-500" />
      </div>
    </div>
  );
}

function ReportTable({ rows }) {
  const COLS = '1.05fr 0.9fr 1fr 0.95fr 0.95fr 16px';
  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className="grid items-center px-3 py-1.5 sticky top-0 bg-white"
        style={{
          gridTemplateColumns: COLS,
          gap: 6,
          fontSize: 8, fontWeight: 500,
          color: COLOR.sidebarText,
          fontFamily: FONT,
          borderBottom: `1px solid ${COLOR.tableBorder}`,
          zIndex: 1,
        }}
      >
        {['Report Type', 'Template Name', 'Created At', 'Status', 'Actions'].map((h) => (
          <span key={h} className="flex items-center gap-0.5">
            {h} <ChevronDown size={7} />
          </span>
        ))}
        <Plus size={9} className="text-neutral-400" />
      </div>

      {rows.map((d, i) => (
        <div
          key={i}
          className="grid items-center px-3 py-1.5 hover:bg-neutral-50 transition-colors"
          style={{
            gridTemplateColumns: COLS,
            gap: 6,
            fontSize: 8,
            color: COLOR.sidebarText,
            fontFamily: FONT,
            borderBottom: `1px solid ${COLOR.tableBorder}`,
            minHeight: 26,
          }}
        >
          <span style={{ fontWeight: 400 }}>CustomReport</span>
          <span>sample report</span>
          <span style={{ color: COLOR.sidebarMuted, fontSize: 7.5 }}>{d}</span>
          <span
            className="flex items-center gap-0.5"
            style={{ color: COLOR.statusGreen }}
          >
            <CheckCircle2 size={9} /> Completed
          </span>
          <button
            className="flex items-center justify-center gap-0.5 transition-colors hover:bg-neutral-100"
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
          </button>
          <button className="w-3 h-3 flex items-center justify-center rounded hover:bg-black/5">
            <MoreVertical size={8} className="text-neutral-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

function DesktopMain() {
  const dates = useMemo(() => buildRowDates(50), []);
  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      <PageHeader />
      <Tabs active="generated" />
      <Pagination />
      <ReportTable rows={dates} />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Extended FAB — floating "Menu" return button                              */
/* -------------------------------------------------------------------------- */

function ExtendedMenuFAB({ onClick, label = 'Menu' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Return to ${label}`}
      className="absolute z-30 flex items-center justify-center transition-all hover:brightness-110 active:scale-95"
      style={{
        right: 24,
        bottom: 28,
        height: 48,
        padding: '0 22px',
        borderRadius: 999,
        background: COLOR.fabTeal,
        color: '#E5E5E5',
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: '0.2px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12)',
      }}
    >
      {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Reports({ onBack, onMenu }) {
  useRoboto();
  const handleMenu = onMenu || onBack;

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
        <DesktopTopBar onBack={onBack} />
        <div className="flex-1 flex overflow-hidden">
          <DesktopSidebar />
          <DesktopMain />
        </div>

        {/* Floating return-to-Menu pill — the mobile escape hatch */}
        <ExtendedMenuFAB onClick={handleMenu} />
      </div>
    </div>
  );
}
