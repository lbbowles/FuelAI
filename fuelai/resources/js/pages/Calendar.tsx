import { Head, Link, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// https://fullcalendar.io/docs

interface CalendarEvent {
    id: number;
    title: string;
    start: string;
    allDay: boolean;
    backgroundColor: string;
    borderColor: string;
    extendedProps: {
        category: string | null;
        difficulty: 'easy' | 'medium' | 'hard' | null;
        is_completed: boolean;
    };
    className?: string;
}

interface CalendarProps {
    events: CalendarEvent[];
}

export default function Calendar({ events }: CalendarProps) {
    const calendarRef = useRef<FullCalendar>(null);
    const [currentMonth, setCurrentMonth] = useState('');


    const handleEventClick = (info: any) => {
        const event = info.event;
        const props = event.extendedProps;

        // redirect to tasks
        router.visit('/tasks');

    };

    const handleDateClick = (info: any) => {
        const dateStr = info.dateStr;
        // Optionally navigate to tasks page with date filter
        console.log('Date clicked:', dateStr);
    };

    const goToToday = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.today();
        }
    };

    const goToPrev = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.prev();
        }
    };

    const goToNext = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.next();
        }
    };

    const upcomingEvents = events
        .filter(event => {
            const eventDate = new Date(event.start);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return eventDate >= today && !event.extendedProps.is_completed;
        })
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        .slice(0, 5);

    return (
        <>
            <Head title="Calendar">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-7xl">
                    {/* Header */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold">Calendar</h1>
                                    <p className="text-base-content/60">
                                        {events.filter(e => !e.extendedProps.is_completed).length} upcoming tasks
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={goToPrev} className="btn btn-outline btn-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button onClick={goToToday} className="btn btn-primary btn-sm">
                                        Today
                                    </button>
                                    <button onClick={goToNext} className="btn btn-outline btn-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Calendar */}
                        <div className="lg:col-span-3">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold calendar-month-title">
                                            {currentMonth}
                                        </h2>
                                    </div>
                                    <FullCalendar
                                        ref={calendarRef}
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={false}
                                        events={events}
                                        eventClick={handleEventClick}
                                        dateClick={handleDateClick}
                                        height="auto"
                                        eventDisplay="block"
                                        displayEventTime={false}
                                        fixedWeekCount={false}
                                        dayMaxEvents={3}
                                        moreLinkText="more"
                                        eventClassNames={(arg) => {
                                            const classes = ['cursor-pointer'];
                                            if (arg.event.extendedProps.is_completed) {
                                                classes.push('line-through', 'opacity-60');
                                            }
                                            return classes;
                                        }}
                                        datesSet={(dateInfo) => {
                                            setCurrentMonth(dateInfo.view.title);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Legend */}
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-lg">Legend</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
                                            <span className="text-sm">Easy</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                                            <span className="text-sm">Medium</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                                            <span className="text-sm">Hard</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Tasks */}
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-lg">Upcoming</h2>
                                    {upcomingEvents.length === 0 ? (
                                        <p className="text-sm text-base-content/60">No upcoming tasks</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {upcomingEvents.map(event => (
                                                <Link
                                                    key={event.id}
                                                    href="/tasks"
                                                    className="block p-2 rounded hover:bg-base-200 transition-colors"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded"
                                                            style={{ backgroundColor: event.backgroundColor }}
                                                        ></div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium truncate">{event.title}</div>
                                                            <div className="text-xs text-base-content/60">
                                                                {new Date(event.start).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    <Link href="/tasks" className="btn btn-primary btn-sm btn-block mt-2">
                                        View All Tasks
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
