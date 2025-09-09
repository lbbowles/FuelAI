import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';


// To Do:
// Get rid of placeholder data
// Make the data consistent between pages
// Add in a login feature / register feature
// Expand on the page so it looks better
// Add Gradients to keep it consist
// https://daisyui.com/components/

export default function Welcome() {
    return (
        <>
            <Head title="FuelAI">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>

            <Navbar />
            <div className="pt-16 min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-foreground mb-6">
                            Welcome to <span className="text-primary">FuelAI</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                            Your AI-powered companion for recipes, fitness, planning, and more.
                            Transform your daily routine with intelligent assistance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                href="/register"
                                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href="/plans"
                                className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                View Plans
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
