import { Head, Link } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';

export default function MealHub() {
    const mealSections = [
        {
            title: 'Recipe Generation',
            description: 'Generate personalized recipes based on your preferences and available ingredients',
            href: '/recipe-generation',
        },
        {
            title: 'Meal List',
            description: 'Browse and manage your collection of saved meals and favorite recipes',
            href: '/meal_list',
        },
        {
            title: 'Meal Plans',
            description: 'Create and view weekly meal plans to stay organized and eat healthy',
            href: '/meal_plans',
        }
    ];

    return (
        <>
            <Head title="Meals">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-7xl">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mealSections.map((section) => (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{section.title}</h2>
                                    <p className="text-base-content/60">{section.description}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <button className={`btn text-black btn-sm`}>
                                            Open
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
