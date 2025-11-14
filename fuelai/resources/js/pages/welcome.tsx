import { Head } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';

export default function Welcome() {
    const features = [
        {
            title: 'Forums',
            description: 'Connect with the community, share experiences, and get support on your fitness journey.',
        },
        {
            title: 'Meal Plans',
            description: 'Personalized meal planning to help you achieve your nutrition goals with ease.',
        },
        {
            title: 'Recipe Generation',
            description: 'AI-powered recipe suggestions tailored to your dietary preferences and goals.',
        },
        {
            title: 'Exercise Tasks',
            description: 'Track your workouts and stay accountable with customizable exercise plans.',
        },
        {
            title: 'Image Food Recognition',
            description: 'Snap a photo of your meal and instantly get nutritional information powered by AI.',
        }
    ];

    return (
        <>
            <Head title="FuelAI">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>

            <NavbarTop />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                            Welcome to FuelAI
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Your AI-powered companion for fitness, nutrition, and wellness
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
