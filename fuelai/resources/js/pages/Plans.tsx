import { Head } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { plans } from '@/data/plansData';

// To Do
// Add in a most popular feature
// Change out placeholder text with sensible words
// Starter has issue where text is not proper
// Add Gradients to keep it consist

// Uses Tailwind + DaisyUI
export default function Plans() {
    return (
        <>
            <Head title="Plans">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <Navbar />
            <div className="min-h-screen bg-base-100 pt-16">
                <div className="hero bg-gradient-to-br from-primary to-secondary py-20">
                    <div className="hero-content text-center max-w-4xl">
                        <div>
                            <h1 className="text-5xl font-bold mb-6 text-base-content">
                                Choose Your Plan
                            </h1>
                            <p className="text-lg text-base-content/70 max-w-2xl">
                                Unlock the full potential of FuelAI with our flexible pricing plans.
                                Start free and upgrade as you grow.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`card bg-base-200 shadow-xl relative`}
                            >

                                <div className="card-body text-center">
                                    <h2 className="card-title text-2xl justify-center mb-4">
                                        {plan.name}
                                    </h2>
                                    <div className="mb-4">
                                        <span className="text-5xl font-bold text-base-content">${plan.price}</span>
                                        <span className="text-base-content/60">/month</span>
                                    </div>
                                    <p className="text-base-content/70 mb-6">
                                        {plan.description}
                                    </p>

                                    <div className="space-y-3 mb-8 text-left">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-success mr-3 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="text-sm text-base-content">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="card-actions justify-center">
                                        <button className={`w-full btn btn-primary`}>
                                            {plan.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-base-200 py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-base-content">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    Can I change my plan anytime?
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/70">
                                        Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                                    </p>
                                </div>
                            </div>

                            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    What happens if I exceed my AI query limit?
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/70">
                                        If you exceed your monthly limit, you'll be notified and can either upgrade your plan or wait until the next billing cycle. No overage fees.
                                    </p>
                                </div>
                            </div>

                            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    Is there a free trial?
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/70">
                                        All plans come with a 7-day free trial. No credit card required to start your trial.
                                    </p>
                                </div>
                            </div>

                            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    How does billing work?
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/70">
                                        You're billed monthly in advance. You can cancel anytime and your plan will remain active until the end of your billing period.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
