import { Head, Link, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';

interface Meal {
    id: number;
    name: string;
    description: string;
    created_by: number;
    created_at: string;
    updated_at: string;
}

interface MealPlan {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface MealViewProps {
    meal: Meal;
    meal_plans: MealPlan[];
}

export default function MealView({ meal, meal_plans }: MealViewProps) {

    // Set Initial State
    const [showAddMealModal, setShowAddMealModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('monday');
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [editName, setEditName] = useState(meal.name);
    const [editDescription, setEditDescription] = useState(meal.description);

    // From MealPlanView
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

    const handleAddMealToPlan = () => {
        if (selectedPlanId) {
            router.post('/meal_plan_meals', {
                meal_plan_id: selectedPlanId,
                meal_id: meal.id,
                day_of_week: selectedDayOfWeek,
                meal_time: selectedMealTime
            }, {
                onSuccess: () => {
                    setShowAddMealModal(false);
                    setSelectedPlanId(null);
                }
            });
        }
    };

    const handleUpdateMeal = () => {
        router.put(`/meals/${meal.id}`, {
            name: editName,
            description: editDescription
        }, {
            onSuccess: () => {
                setShowEditModal(false);
            }
        });
    };

    const handleDeleteMeal = () => {
        if (confirm('Are you sure you want to delete this meal?')) {
            router.delete(`/meals/${meal.id}`, {
                onSuccess: () => {
                    router.visit('/meal_list');
                }
            });
        }
    };

    return (
        <>
            <Head title={`${meal.name} - Meal`}>
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-5xl">
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Link href="/meal_list" className="btn btn-ghost btn-sm">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back
                                        </Link>
                                        <h1 className="text-3xl font-bold">{meal.name}</h1>
                                    </div>
                                    <p className="text-base-content/60 ml-14">
                                        Added {new Date(meal.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setShowAddMealModal(true)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Add to Plan
                                    </button>
                                    <button
                                        onClick={handleDeleteMeal}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-2xl font-semibold mb-4">Recipe Details</h2>
                            <div className="prose max-w-none">
                                <div className="whitespace-pre-wrap">
                                    {meal.description || 'No description available'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showAddMealModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add "{meal.name}" to Meal Plan</h3>

                        {meal_plans.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-base-content/60 mb-4">
                                    You don't have any meal plans yet. Create one first!
                                </p>
                                <Link href="/meal_plans" className="btn btn-primary btn-sm">
                                    Go to Meal Plans
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Select Meal Plan</span>
                                    </label>
                                    <select
                                        value={selectedPlanId || ''}
                                        onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                                        className="select select-bordered"
                                    >
                                        <option value="" disabled>Choose a meal plan</option>
                                        {meal_plans.map((plan) => (
                                            <option key={plan.id} value={plan.id}>
                                                {plan.name}
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
                                    setSelectedPlanId(null);
                                }}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            {meal_plans.length > 0 && (
                                <button
                                    onClick={handleAddMealToPlan}
                                    disabled={!selectedPlanId}
                                    className="btn btn-primary"
                                >
                                    Add to Plan
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => {
                        setShowAddMealModal(false);
                        setSelectedPlanId(null);
                    }}></div>
                </div>
            )}

            {showEditModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">Edit Meal</h3>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Meal Name</span>
                            </label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="textarea textarea-bordered h-64"
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditName(meal.name);
                                    setEditDescription(meal.description);
                                }}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateMeal}
                                className="btn btn-primary"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => {
                        setShowEditModal(false);
                        setEditName(meal.name);
                        setEditDescription(meal.description);
                    }}></div>
                </div>
            )}
        </>
    );
}
