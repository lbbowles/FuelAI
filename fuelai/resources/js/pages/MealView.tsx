import { Head, Link, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';

interface NutritionalInfo {
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
    fiber?: number | null;
    sugar?: number | null;
    sodium?: number | null;
    other_nutrients?: string | null;
}

interface Meal {
    id: number;
    name: string;
    description: string;
    instruction: string | null; 
    created_by: number;
    created_at: string;
    updated_at: string;

    image_base64?: string | null;
    nutritional_info?: NutritionalInfo;
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
    const [showAddMealModal, setShowAddMealModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [editName, setEditName] = useState(meal.name);
    const [editDescription, setEditDescription] = useState(meal.description);
    const [editInstruction, setEditInstruction] = useState(meal.instruction ?? ""); // ✅ updated

    const [editCalories, setEditCalories] = useState(meal.nutritional_info?.calories ?? '');
    const [editProtein, setEditProtein] = useState(meal.nutritional_info?.protein ?? '');
    const [editCarbs, setEditCarbs] = useState(meal.nutritional_info?.carbs ?? '');
    const [editFat, setEditFat] = useState(meal.nutritional_info?.fat ?? '');
    const [editFiber, setEditFiber] = useState(meal.nutritional_info?.fiber ?? '');
    const [editSugar, setEditSugar] = useState(meal.nutritional_info?.sugar ?? '');
    const [editSodium, setEditSodium] = useState(meal.nutritional_info?.sodium ?? '');
    const [editOther, setEditOther] = useState(meal.nutritional_info?.other_nutrients ?? '');

    const daysOfWeek = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
    const mealTimes = ['breakfast','lunch','dinner','snack'];

    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('monday');
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');

    const getNextDateForDay = (dayName: string) => {
        const targetDay = daysOfWeek.indexOf(dayName.toLowerCase());
        const today = new Date();
        const currentDay = today.getDay();
        const offset = (targetDay - currentDay + 7) % 7;
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + offset);
        return targetDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    };

    const handleUpdateMeal = () => {
        router.put(`/meals/${meal.id}`, {
            name: editName,
            description: editDescription,
            instruction: editInstruction, 

            calories: editCalories,
            protein: editProtein,
            carbs: editCarbs,
            fat: editFat,
            fiber: editFiber,
            sugar: editSugar,
            sodium: editSodium,
            other_nutrients: editOther,
        }, {
            onSuccess: () => setShowEditModal(false)
        });
    };

    const handleDeleteMeal = () => {
        if (confirm('Delete this meal?')) {
            router.delete(`/meals/${meal.id}`, {
                onSuccess: () => router.visit('/meal_list')
            });
        }
    };

    const handleAddMealToPlan = () => {
        if (!selectedPlanId) return;

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
    };

    return (
        <>
            <Head title={`${meal.name} - Meal`} />
            <NavbarTop />

            <div className="max-w-4xl mx-auto p-6 pt-28">

                {/* Header */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body flex flex-col md:flex-row justify-between">

                        <div>
                            <Link href="/meal_list" className="btn btn-ghost btn-sm mb-2">
                                ← Back
                            </Link>
                            <h1 className="text-3xl font-bold">{meal.name}</h1>
                            <p className="text-base-content/60">
                                Added {new Date(meal.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => setShowEditModal(true)} className="btn btn-outline btn-sm">
                                Edit
                            </button>
                            <button onClick={() => setShowAddMealModal(true)} className="btn btn-primary btn-sm">
                                Add to Plan
                            </button>
                            <button onClick={handleDeleteMeal} className="btn btn-error btn-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image */}
                {meal.image_base64 && (
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <figure>
                            <img src={meal.image_base64} className="max-h-80 object-cover w-full" />
                        </figure>
                    </div>
                )}

                {/* Description */}
                <div className="card bg-base-100 shadow-xl mb-6 p-6">
                    <h2 className="text-2xl font-semibold mb-2">Description</h2>
                    <p className="whitespace-pre-wrap">{meal.description}</p>
                </div>

                {/* Instruction — updated */}
                {meal.instruction && (
                    <div className="card bg-base-100 shadow-xl mb-6 p-6">
                        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                        <p className="whitespace-pre-wrap">{meal.instruction}</p>
                    </div>
                )}

                {/* Nutrition */}
                {meal.nutritional_info && (
                    <div className="card bg-base-100 shadow-xl p-6">
                        <h2 className="text-2xl font-semibold mb-4">Nutrition Facts</h2>

                        <table className="table">
                            <tbody>
                                <tr><td>Calories</td><td>{meal.nutritional_info.calories ?? '–'}</td></tr>
                                <tr><td>Protein</td><td>{meal.nutritional_info.protein ?? '–'} g</td></tr>
                                <tr><td>Carbs</td><td>{meal.nutritional_info.carbs ?? '–'} g</td></tr>
                                <tr><td>Fat</td><td>{meal.nutritional_info.fat ?? '–'} g</td></tr>
                                <tr><td>Fiber</td><td>{meal.nutritional_info.fiber ?? '–'} g</td></tr>
                                <tr><td>Sugar</td><td>{meal.nutritional_info.sugar ?? '–'} g</td></tr>
                                <tr><td>Sodium</td><td>{meal.nutritional_info.sodium ?? '–'} mg</td></tr>
                            </tbody>
                        </table>

                        {meal.nutritional_info.other_nutrients && (
                            <div className="mt-4">
                                <strong>Other Notes:</strong>
                                <p>{meal.nutritional_info.other_nutrients}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            {showEditModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">Edit Meal</h3>

                        {/* Name */}
                        <label className="form-control mb-4">
                            <span className="label-text">Meal Name</span>
                            <input className="input input-bordered"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </label>

                        {/* Description */}
                        <label className="form-control mb-4">
                            <span className="label-text">Description</span>
                            <textarea className="textarea textarea-bordered"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </label>

                        {/* Instruction — updated */}
                        <label className="form-control mb-4">
                            <span className="label-text">Instructions</span>
                            <textarea className="textarea textarea-bordered"
                                value={editInstruction}
                                onChange={(e) => setEditInstruction(e.target.value)}
                            />
                        </label>

                        {/* Nutrition */}
                        <h3 className="text-lg font-bold mb-2">Nutrition</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="label"><span>Calories</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editCalories}
                                    onChange={(e) => setEditCalories(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label"><span>Protein (g)</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editProtein}
                                    onChange={(e) => setEditProtein(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label"><span>Carbs (g)</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editCarbs}
                                    onChange={(e) => setEditCarbs(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label"><span>Fat (g)</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editFat}
                                    onChange={(e) => setEditFat(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label"><span>Fiber (g)</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editFiber}
                                    onChange={(e) => setEditFiber(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label"><span>Sugar (g)</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editSugar}
                                    onChange={(e) => setEditSugar(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label"><span>Sodium (mg)</span></label>
                                <input className="input input-bordered" type="number"
                                    value={editSodium}
                                    onChange={(e) => setEditSodium(e.target.value)}
                                />
                            </div>
                        </div>

                        <label className="form-control mb-4">
                            <span className="label-text">Other Notes</span>
                            <textarea className="textarea textarea-bordered"
                                value={editOther}
                                onChange={(e) => setEditOther(e.target.value)}
                            />
                        </label>

                        {/* Actions */}
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleUpdateMeal}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
