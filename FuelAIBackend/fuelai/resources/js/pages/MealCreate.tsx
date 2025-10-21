import { Head, Link, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';

export default function MealCreate() {

    // Set Initial States
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{name?: string; description?: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrors({});

        router.post('/meals', {
            name,
            description
        }, {
            onSuccess: () => {
                setName('');
                setDescription('');
            },
            onError: (errors) => {
                setErrors(errors);
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <>
            <Head title="Create Meal">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-3xl">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center gap-4 mb-6">
                                <Link href="/meal_list" className="btn btn-ghost btn-sm">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back
                                </Link>
                                <h1 className="text-3xl font-bold">Create New Meal</h1>
                            </div>

                            <div className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Meal Name</span>
                                        <span className="label-text-alt text-error">Required</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Chicken Stir Fry"
                                        className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                    />
                                    {errors.name && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.name}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Description</span>
                                        <span className="label-text-alt">Optional</span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your meal, ingredients, cooking instructions, etc."
                                        className={`textarea textarea-bordered w-full h-40 ${errors.description ? 'textarea-error' : ''}`}
                                    />
                                    {errors.description && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.description}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="flex gap-3 justify-end pt-4">
                                    <Link href="/meal_list" className="btn btn-ghost">
                                        Cancel
                                    </Link>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !name.trim()}
                                        className="btn btn-primary"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Meal'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
