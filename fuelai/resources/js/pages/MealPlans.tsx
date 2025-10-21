import { Head, Link, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';

interface MealPlans {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface MealPlansProps {
    meal_plans: MealPlans[];
}

export default function MealPlans({ meal_plans }: MealPlansProps) {

    // Set Initial State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanDescription, setNewPlanDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateMealPlan = () => {
        setIsSubmitting(true);
        router.post('/meal_plans', {
            name: newPlanName,
            description: newPlanDescription
        }, {
            onSuccess: () => {
                setShowCreateModal(false);
                setNewPlanName('');
                setNewPlanDescription('');
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleDeletePlan = (planId: number) => {
        if (confirm('Are you sure you want to delete this meal plan?')) {
            router.delete(`/meal_plans/${planId}`);
        }
    };

    return (
        <>
            <Head title="Meal Plans">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-7xl">
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold">Meal Plans</h1>
                                    <p className="text-base-content/60">
                                        {meal_plans.length} {meal_plans.length === 1 ? 'plan' : 'plans'} created
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="btn btn-primary"
                                >
                                    Create New Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    {meal_plans.length === 0 ? (
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center py-12">
                                <h2 className="text-2xl font-bold mb-2">No meal plans yet</h2>
                                <p className="text-base-content/60 mb-4">
                                    Create your first meal plan to organize your weekly meals
                                </p>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="btn btn-primary mx-auto"
                                >
                                    Create Meal Plan
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {meal_plans.map((plan) => (
                                <div key={plan.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                                    <div className="card-body">
                                        <h2 className="card-title text-xl">{plan.name}</h2>
                                        <p className="text-base-content/60 line-clamp-3">
                                            {plan.description || 'No description available'}
                                        </p>
                                        <div className="text-xs text-base-content/50 mt-2">
                                            Created {new Date(plan.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="card-actions justify-end mt-4 gap-2">
                                            <Link
                                                href={`/meal_plans/${plan.id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View Plan
                                            </Link>
                                            <button
                                                onClick={() => handleDeletePlan(plan.id)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showCreateModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Create New Meal Plan</h3>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Plan Name</span>
                                <span className="label-text-alt text-error">Required</span>
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
                                <span className="label-text-alt">Optional</span>
                            </label>
                            <textarea
                                value={newPlanDescription}
                                onChange={(e) => setNewPlanDescription(e.target.value)}
                                placeholder="Describe your meal plan..."
                                className="textarea textarea-bordered"
                                rows={3}
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setNewPlanName('');
                                    setNewPlanDescription('');
                                }}
                                className="btn btn-ghost"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateMealPlan}
                                disabled={isSubmitting || !newPlanName.trim()}
                                className="btn btn-primary"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating...
                                    </>
                                ) : (
                                    'Create Plan'
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => {
                        if (!isSubmitting) {
                            setShowCreateModal(false);
                            setNewPlanName('');
                            setNewPlanDescription('');
                        }
                    }}></div>
                </div>
            )}
        </>
    );
}
