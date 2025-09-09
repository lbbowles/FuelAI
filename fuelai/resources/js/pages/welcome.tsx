import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';


// To Do:
// Get rid of placeholder data
// Make the data consistent between pages
// Add in a login feature / register feature
// Expand on the page so it looks better
// Add Gradients to keep it consist

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

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Recipe Generation</h3>
                            <p className="text-muted-foreground">Create personalized recipes based on your preferences and dietary needs.</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Exercise Planning</h3>
                            <p className="text-muted-foreground">Get AI-powered workout routines tailored to your fitness goals.</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Smart Calendar</h3>
                            <p className="text-muted-foreground">Organize your schedule with intelligent planning and reminders.</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Community Forums</h3>
                            <p className="text-muted-foreground">Connect with others and share your journey to better living.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
