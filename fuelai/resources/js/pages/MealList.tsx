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
    image_data?: string | null;      // Base64 from Laravel (TEXT column)
    image_base64?: string | null;    // Derived field if backend converts BYTEA → Base64
}

interface MealPlan {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface MealListProps {
    meals: Meal[];
    meal_plans: MealPlan[];
}

export default function MealList({ meals, meal_plans }: MealListProps) {
    // Set Initial States
    const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
    const [showAddMealModal, setShowAddMealModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanDescription, setNewPlanDescription] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('monday');
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const mealTimes = ['breakfast', 'lunch', 'dinner', 'snack'];

    const handleAddToMealPlan = (meal: Meal) => {
        if (meal_plans.length === 0) {
            setShowCreatePlanModal(true);
        } else {
            setSelectedMeal(meal);
            setShowAddMealModal(true);
        }
    };

    const handleCreateMealPlan = () => {
        router.post('/meal_plans', {
            name: newPlanName,
            description: newPlanDescription
        }, {
            onSuccess: () => {
                setShowCreatePlanModal(false);
                setNewPlanName('');
                setNewPlanDescription('');
            }
        });
    };

    const handleAddMealToPlan = () => {
        if (selectedMeal && selectedPlanId) {
            router.post('/meal_plan_meals', {
                meal_plan_id: selectedPlanId,
                meal_id: selectedMeal.id,
                day_of_week: selectedDayOfWeek,
                meal_time: selectedMealTime
            }, {
                onSuccess: () => {
                    setShowAddMealModal(false);
                    setSelectedMeal(null);
                    setSelectedPlanId(null);
                }
            });
        }
    };

    return (
        <>
            <Head title="Meal List">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-7xl">
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold">Meal List</h1>
                                    <p className="text-base-content/60">
                                        {meals.length} {meals.length === 1 ? 'meal' : 'meals'} available
                                    </p>
                                </div>
                                <Link href="/meals/create" className="btn btn-primary">
                                    Add New Meal
                                </Link>
                            </div>
                        </div>
                    </div>

                    {meals.length === 0 ? (
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center py-12">
                                <h2 className="text-2xl font-bold mb-2">No meals yet</h2>
                                <p className="text-base-content/60 mb-4">
                                    Start by creating your first meal
                                </p>
                                <Link href="/meals/create" className="btn btn-primary mx-auto">
                                    Create Meal
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {meals.map((meal) => (
                                <div key={meal.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                                    {(meal.image_base64 || meal.image_data) ? (
                                        <figure className="h-48 overflow-hidden flex justify-center items-center bg-base-200">
                                            <img
                                                src={meal.image_base64 || meal.image_data || ''}

                                                alt={meal.name}
                                                className="w-40 h-40 object-cover rounded-xl"
                                            />
                                        </figure>
                                    ) : (
                                        <figure className="h-48 bg-base-200 flex items-center justify-center text-base-content/40">
                                            <span>No Image</span>
                                        </figure>
                                    )}

                                    <div className="card-body">
                                        <h2 className="card-title text-xl">{meal.name}</h2>
                                        <p className="text-base-content/60 line-clamp-3">
                                            {meal.description || 'No description available'}
                                        </p>
                                        <div className="text-xs text-base-content/50 mt-2">
                                            Added {new Date(meal.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="card-actions justify-end mt-4 gap-2">
                                            <Link href={`/meals/${meal.id}`} className="btn btn-outline btn-sm">
                                                View
                                            </Link>
                                            <button onClick={() => handleAddToMealPlan(meal)} className="btn btn-primary btn-sm">
                                                Add to Plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- Create Meal Plan Modal --- */}
            {showCreatePlanModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Create Meal Plan</h3>
                        <p className="text-base-content/60 mb-4">
                            You don't have any meal plans yet. Create one to get started!
                        </p>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Plan Name</span>
                            </label>
                            <input
                                type="text"
                                value={newPlanName}
                                onChange={(e) => setNewPlanName(e.target.value)}
                                placeholder="e.g., Weekly Meal Plan"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                value={newPlanDescription}
                                onChange={(e) => setNewPlanDescription(e.target.value)}
                                placeholder="Optional description"
                                className="textarea textarea-bordered"
                                rows={3}
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => setShowCreatePlanModal(false)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button onClick={handleCreateMealPlan} className="btn btn-primary">
                                Create Plan
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowCreatePlanModal(false)}></div>
                </div>
            )}

            {/* --- Add Meal to Plan Modal --- */}
            {showAddMealModal && selectedMeal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add "{selectedMeal.name}" to Meal Plan</h3>
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
                                        {day.charAt(0).toUpperCase() + day.slice(1)}
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
                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddMealModal(false);
                                    setSelectedMeal(null);
                                }}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button onClick={handleAddMealToPlan} className="btn btn-primary">
                                Add to Plan
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => {
                            setShowAddMealModal(false);
                            setSelectedMeal(null);
                        }}
                    ></div>
                </div>
            )}
        </>
    );
}
