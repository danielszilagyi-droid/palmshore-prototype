import React, { useEffect } from 'react';
import {
  Grid3x3, Bell, ChevronDown, MoreVertical,
  ChevronLeft, ChevronRight, Plus,
  Video, Phone, UtensilsCrossed,
} from 'lucide-react';

const HOUR_HEIGHT = 82;
const TIME_COL_WIDTH = 68;

const COLOR = {
  topNav:       '#ECF4F4',
  page:         '#F7F9FA',
  eventGreen:   '#C8F1CF',
  eventPurple:  '#C5A3FF',
  fabTeal:      '#005C65',
  nowRed:       '#E95A58',
  selectBlue:   '#2979FF',
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

function Avatar({ initials = 'AM' }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-medium shrink-0 ring-1 ring-black/5"
      style={{
        background: 'linear-gradient(135deg, #4a5d52 0%, #2d3a33 100%)',
        fontFamily: FONT,
      }}
      aria-label="Profile"
    >
      {initials}
    </div>
  );
}

function IconButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
    >
      {children}
    </button>
  );
}

function TopBar({ onApps, onNotifications, onProfile }) {
  return (
    <header
      className="h-16 flex items-center justify-between px-4 shrink-0"
      style={{ background: COLOR.topNav }}
    >
      <IconButton label="Apps" onClick={onApps}>
        <Grid3x3 size={22} strokeWidth={2.5} className="text-slate-800" />
      </IconButton>
      <div className="flex items-center gap-2">
        <IconButton label="Notifications" onClick={onNotifications}>
          <Bell size={22} className="text-slate-800" />
        </IconButton>
        <button
          type="button"
          onClick={onProfile}
          aria-label="Profile"
          className="rounded-full p-0 border-0 bg-transparent cursor-pointer"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Avatar />
        </button>
      </div>
    </header>
  );
}

function DateHeader({ date = 'Wed Mar 11', onDate, onMore }) {
  return (
    <div
      className="h-16 bg-white flex items-center justify-between px-4 shrink-0 relative z-10"
      style={{ boxShadow: '0 3px 7px rgba(0,0,0,0.06)', borderBottom: '1px solid #E5E5E5' }}
    >
      <button
        type="button"
        onClick={onDate}
        className="flex items-center gap-1 px-2 py-1 -ml-2 rounded-md hover:bg-black/5 transition-colors"
      >
        <span
          className="text-black"
          style={{ fontSize: 20, fontWeight: 500, lineHeight: '24px', fontFamily: FONT }}
        >
          {date}
        </span>
        <ChevronDown size={22} className="text-slate-500" strokeWidth={2} />
      </button>
      <IconButton label="More" onClick={onMore}>
        <MoreVertical size={22} className="text-slate-500" />
      </IconButton>
    </div>
  );
}

function FloatingActionButton({ onClick, label = 'Add' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
      style={{ background: COLOR.fabTeal }}
    >
      <Plus size={24} className="text-white" strokeWidth={2.25} />
    </button>
  );
}

function ExplicitIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="0.7" y="0.7" width="12.6" height="12.6" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M4.5 4.4h4.6M4.5 7h3.6M4.5 9.6h4.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function EventIcon({ kind }) {
  const props = { size: 14, strokeWidth: 2 };
  switch (kind) {
    case 'video':    return <Video {...props} />;
    case 'phone':    return <Phone {...props} />;
    case 'utensils': return <UtensilsCrossed {...props} />;
    case 'explicit': return <ExplicitIcon size={14} />;
    default:         return null;
  }
}

const events = [
  { id: 1, title: 'Susan Taylor',    timeLabel: '9:00am - 10:00am',  subtitle: 'Wealth Planning', icon: 'video',    color: 'green',  top: 0,   height: 80 },
  { id: 2, title: 'Ahmad Pasrand',   timeLabel: '10:00am - 10:45am', subtitle: 'Wealth Planning', icon: 'phone',    color: 'green',  top: 82,  height: 60 },
  { id: 3, title: 'Lunch',           timeLabel: '12pm - 12:30pm',                                 icon: 'utensils', color: 'purple', top: 200, height: 32 },
  { id: 4, title: 'Lunch',           timeLabel: '12:00pm - 1:00pm',                               icon: 'utensils', color: 'green',  top: 246, height: 70 },
  { id: 5, title: 'Busy',            timeLabel: '1:45pm - 2:10pm',                                icon: 'explicit', color: 'green',  top: 389, height: 34, halfWidth: true },
  { id: 6, title: 'Busy',            timeLabel: '2pm - 2:45pm',                                   icon: 'explicit', color: 'purple', top: 410, height: 60 },
  { id: 7, title: 'Alfonso Stanton', timeLabel: '3:50pm - 4:20pm',  subtitle: 'Wealth Planning',  icon: 'video',    color: 'green',  top: 559, height: 50 },
];

function EventBlock({ event }) {
  const bg = event.color === 'green' ? COLOR.eventGreen : COLOR.eventPurple;
  const showSubtitle = event.subtitle && event.height >= 50;
  return (
    <div
      className="absolute rounded-lg flex gap-2 overflow-hidden"
      style={{
        top: event.top,
        height: event.height,
        left: 22,
        right: event.halfWidth ? '50%' : 16,
        background: bg,
        border: '1px solid #ffffff',
        color: 'rgba(0,0,0,0.9)',
        fontFamily: FONT,
        fontSize: 12,
        lineHeight: '15px',
        padding: '4px 6px',
      }}
    >
      <div className="pt-0.5 shrink-0">
        <EventIcon kind={event.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium truncate">{event.title}</div>
        <div className="truncate" style={{ marginTop: 2 }}>{event.timeLabel}</div>
        {showSubtitle && (
          <div className="truncate" style={{ marginTop: 2 }}>{event.subtitle}</div>
        )}
      </div>
    </div>
  );
}

function SelectionBlock() {
  return (
    <div
      className="absolute rounded-lg pointer-events-none"
      style={{
        top: 4 * HOUR_HEIGHT,
        height: 30,
        left: 22,
        right: 16,
        background: 'rgba(41, 121, 255, 0.10)',
        border: `1.5px solid ${COLOR.selectBlue}`,
      }}
    />
  );
}

function NowIndicator({ topPx }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top: topPx, left: -4, right: 0, height: 0 }}
    >
      <div
        className="absolute"
        style={{
          left: 0,
          top: -4,
          width: 8,
          height: 8,
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
  );
}

function DayView() {
  const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
  const calendarHeight = (hours.length - 1) * HOUR_HEIGHT + 40;
  const nowPx = 1.5 * HOUR_HEIGHT;

  return (
    <main
      className="flex-1 bg-white relative overflow-y-auto"
      style={{ fontFamily: FONT }}
    >
      <div
        style={{
          height: 28,
          background: '#EFEFEF',
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0 6px, rgba(0,0,0,0.045) 6px 7px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
        aria-hidden="true"
      />

      <div className="relative" style={{ height: calendarHeight }}>
        <div className="absolute left-0 top-0 bottom-0" style={{ width: TIME_COL_WIDTH }}>
          {hours.map((h, i) => (
            <div
              key={h}
              className="absolute pr-3 text-right"
              style={{
                top: i * HOUR_HEIGHT - 10,
                right: 0,
                fontSize: 14,
                lineHeight: '20px',
                color: 'rgba(0,0,0,0.45)',
                fontFamily: FONT,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {hours.map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: i * HOUR_HEIGHT,
              left: TIME_COL_WIDTH,
              right: 0,
              height: 1,
              background: 'rgba(0,0,0,0.08)',
            }}
          />
        ))}

        <div
          className="absolute top-0 bottom-0"
          style={{ left: TIME_COL_WIDTH, right: 0 }}
        >
          {events.map((e) => (
            <EventBlock key={e.id} event={e} />
          ))}
          <SelectionBlock />
          <NowIndicator topPx={nowPx} />
        </div>
      </div>
    </main>
  );
}

function BottomBar({ onPrev, onNext, onAdd }) {
  return (
    <footer
      className="h-20 bg-white shrink-0 flex items-center px-6 relative"
      style={{
        borderTop: '1px solid #E5E5E5',
        boxShadow: '0 -1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div className="w-12" aria-hidden="true" />

      <div className="flex-1 flex items-center justify-center gap-6">
        <IconButton label="Previous day" onClick={onPrev}>
          <ChevronLeft size={22} className="text-slate-700" strokeWidth={2} />
        </IconButton>
        <IconButton label="Next day" onClick={onNext}>
          <ChevronRight size={22} className="text-slate-700" strokeWidth={2} />
        </IconButton>
      </div>

      <FloatingActionButton onClick={onAdd} label="Add event" />
    </footer>
  );
}

export default function Schedule({ onApps, onNotifications, onProfile }) {
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
        <TopBar
          onApps={onApps}
          onNotifications={onNotifications}
          onProfile={onProfile}
        />
        <DateHeader date="Wed Mar 11" />
        <DayView />
        <BottomBar />
      </div>
    </div>
  );
}