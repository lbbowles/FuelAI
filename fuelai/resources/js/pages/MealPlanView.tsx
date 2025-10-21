import { Head, Link, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Using Full Calendar's Time Grid

interface Meal {
    id: number;
    name: string;
    description: string;
}

interface MealPlanMeal {
    id: number;
    meal_plan_id: number;
    meal_id: number;
    day_of_week: string;
    meal_time: string;
    meal: Meal;
}

interface MealPlan {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface MealPlanViewProps {
    meal_plan: MealPlan;
    meal_plan_meals: MealPlanMeal[];
    available_meals: Meal[];
}

export default function MealPlanView({ meal_plan, meal_plan_meals, available_meals }: MealPlanViewProps) {

    // Set Initial State
    const calendarRef = useRef<FullCalendar>(null);
    const [showAddMealModal, setShowAddMealModal] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('monday');
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealTimes = ['breakfast', 'lunch', 'dinner', 'snack'];

    const getNextDateForDay = (dayName: string) => {
        const targetDay = daysOfWeek.indexOf(dayName.toLowerCase());
        const today = new Date();
        const currentDay = today.getDay();

        let daysUntilTarget = (targetDay - currentDay + 7) % 7;
        if (daysUntilTarget === 0) daysUntilTarget = 0;

        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysUntilTarget);

        return targetDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    };

    const getMealTimeHour = (mealTime: string) => {
        const times: { [key: string]: string } = {
            'breakfast': '08:00:00',
            'lunch': '12:00:00',
            'dinner': '18:00:00',
            'snack': '15:00:00'
        };
        return times[mealTime] || '12:00:00';
    };

    const getMealTimeColor = (mealTime: string) => {
        const colors: { [key: string]: string } = {
            'breakfast': '#f59e0b',
            'lunch': '#3b82f6',
            'dinner': '#8b5cf6',
            'snack': '#ec4899'
        };
        return colors[mealTime] || '#6b7280';
    };

    const getDateForDay = (dayName: string) => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const targetDay = days.indexOf(dayName.toLowerCase());
        const today = new Date();
        const currentDay = today.getDay();

        let daysUntilTarget = (targetDay - currentDay + 7) % 7;
        if (daysUntilTarget === 0) daysUntilTarget = 0;

        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysUntilTarget);

        return targetDate.toISOString().split('T')[0];
    };

    const events = meal_plan_meals.map(mpm => ({
        id: mpm.id.toString(),
        title: mpm.meal.name,
        start: `${getDateForDay(mpm.day_of_week)}T${getMealTimeHour(mpm.meal_time)}`,
        backgroundColor: getMealTimeColor(mpm.meal_time),
        borderColor: getMealTimeColor(mpm.meal_time),
        extendedProps: {
            mealPlanMealId: mpm.id,
            description: mpm.meal.description,
            mealTime: mpm.meal_time
        }
    }));

    const handleAddMeal = () => {
        if (selectedMealId) {
            router.post('/meal_plan_meals', {
                meal_plan_id: meal_plan.id,
                meal_id: selectedMealId,
                day_of_week: selectedDayOfWeek,
                meal_time: selectedMealTime
            }, {
                onSuccess: () => {
                    setShowAddMealModal(false);
                    setSelectedMealId(null);
                }
            });
        }
    };

    const handleEventClick = (info: any) => {
        const mealPlanMealId = info.event.extendedProps.mealPlanMealId;
        if (confirm('Remove this meal from the plan?')) {
            router.delete(`/meal_plan_meals/${mealPlanMealId}`);
        }
    };

    return (
        <>
            <Head title={`${meal_plan.name} - Meal Plan`}>
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-7xl">
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Link href="/meal_plans" className="btn btn-ghost btn-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back
                                        </Link>
                                        <h1 className="text-3xl font-bold">{meal_plan.name}</h1>
                                    </div>
                                    {meal_plan.description && (
                                        <p className="text-base-content/60 ml-20">
                                            {meal_plan.description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowAddMealModal(true)}
                                    className="btn btn-primary"
                                >
                                    Add Meal
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    {meal_plan_meals.length === 0 ? (
                                        <div className="text-center py-12">
                                            <h2 className="text-2xl font-bold mb-2">No meals planned yet</h2>
                                            <p className="text-base-content/60 mb-4">
                                                Start adding meals to your plan
                                            </p>
                                            <button
                                                onClick={() => setShowAddMealModal(true)}
                                                className="btn btn-primary"
                                            >
                                                Add First Meal
                                            </button>
                                        </div>
                                    ) : (
                                        <FullCalendar
                                            ref={calendarRef}
                                            plugins={[timeGridPlugin, interactionPlugin]}
                                            initialView="timeGridWeek"
                                            headerToolbar={{
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: ''
                                            }}
                                            allDaySlot={false}
                                            slotMinTime="06:00:00"
                                            slotMaxTime="22:00:00"
                                            height="auto"
                                            events={events}
                                            eventClick={handleEventClick}
                                            eventDisplay="block"
                                            slotDuration="01:00:00"
                                            expandRows={true}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-lg">Legend</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                                            <span className="text-sm">Breakfast</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
                                            <span className="text-sm">Lunch</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
                                            <span className="text-sm">Dinner</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ec4899' }}></div>
                                            <span className="text-sm">Snack</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {showAddMealModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add Meal to Plan</h3>

                        {available_meals.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-base-content/60 mb-4">
                                    You don't have any meals yet. Create some meals first!
                                </p>
                                <Link href="/meals/create" className="btn btn-primary btn-sm">
                                    Create Meal
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Select Meal</span>
                                    </label>
                                    <select
                                        value={selectedMealId || ''}
                                        onChange={(e) => setSelectedMealId(Number(e.target.value))}
                                        className="select select-bordered"
                                    >
                                        <option value="" disabled>Choose a meal</option>
                                        {available_meals.map((meal) => (
                                            <option key={meal.id} value={meal.id}>
                                                {meal.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Day of Week</span>
                                    </label>
                                    <select
                                        value={selectedDayOfWeek}
                                        onChange={(e) => setSelectedDayOfWeek(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        {daysOfWeek.map((day) => (
                                            <option key={day} value={day}>
                                                {day.charAt(0).toUpperCase() + day.slice(1)} ({getNextDateForDay(day)})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Meal Time</span>
                                    </label>
                                    <select
                                        value={selectedMealTime}
                                        onChange={(e) => setSelectedMealTime(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        {mealTimes.map((time) => (
                                            <option key={time} value={time}>
                                                {time.charAt(0).toUpperCase() + time.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddMealModal(false);
                                    setSelectedMealId(null);
                                }}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            {available_meals.length > 0 && (
                                <button
                                    onClick={handleAddMeal}
                                    disabled={!selectedMealId}
                                    className="btn btn-primary"
                                >
                                    Add to Plan
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => {
                        setShowAddMealModal(false);
                        setSelectedMealId(null);
                    }}></div>
                </div>
            )}
        </>
    );
}
