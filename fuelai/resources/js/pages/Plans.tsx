import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';


export default function Plans() {
    console.log('Plans component mounted!');

    // Set some temp values until we merge databases
    const plans = [
        {
            name: 'Starter',
            price: 5,
            description: 'Perfect for getting started with AI-powered features',
            features: [
                'Expanded AI Credits',
                'Access to better models',
                'Basic recipe generation',
                'Forum access',
                'Email support',
                'Up to 100 AI queries/month'
            ],
            buttonText: 'Get Started',
            popular: false,
            buttonClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
        },
        {
            name: 'Pro',
            price: 10,
            description: 'Ideal for regular users who want more capabilities',
            features: [
                'Everything in Starter',
                'Advanced AI models',
                'Unlimited recipe generation',
                'Priority forum access',
                'Exercise recommendations',
                'Priority support',
                'Up to 500 AI queries/month',
                'Custom meal planning'
            ],
            buttonText: 'Go Pro',
            popular: true,
            buttonClass: 'bg-primary text-primary-foreground hover:bg-primary/90'
        },
        {
            name: 'Premium',
            price: 20,
            description: 'Maximum features for power users and professionals',
            features: [
                'Everything in Pro',
                'Latest AI models',
                'Unlimited AI queries',
                'Advanced analytics',
                '24/7 priority support',
                'Custom integrations',
                'Advanced meal analytics',
                'Nutritionist consultations'
            ],
            buttonText: 'Go Premium',
            popular: false,
            buttonClass: 'bg-accent text-accent-foreground hover:bg-accent/90'
        }
    ];

    return (
        <>
            <Head title="Plans" />
            {/* Set Navbar */}
            <Navbar />
            <div className="min-h-screen bg-background text-foreground pt-16">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h1 className="text-5xl font-bold mb-6">
                            Choose Your Plan
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Unlock the full potential of FuelAI with our flexible pricing plans.
                            Start free and upgrade as you grow.
                        </p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`bg-card rounded-lg shadow-lg p-8 relative border ${
                                    plan.popular
                                        ? 'border-primary scale-105 md:scale-110'
                                        : 'border-border'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {plan.name}
                                    </h2>
                                    <div className="mb-4">
                                        <span className="text-5xl font-bold">${plan.price}</span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${plan.buttonClass}`}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-muted/30 py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            <details className="bg-card rounded-lg border border-border">
                                <summary className="p-6 cursor-pointer font-medium text-lg hover:bg-muted/50">
                                    Can I change my plan anytime?
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground">
                                    <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                                </div>
                            </details>

                            <details className="bg-card rounded-lg border border-border">
                                <summary className="p-6 cursor-pointer font-medium text-lg hover:bg-muted/50">
                                    What happens if I exceed my AI query limit?
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground">
                                    <p>If you exceed your monthly limit, you'll be notified and can either upgrade your plan or wait until the next billing cycle. No overage fees.</p>
                                </div>
                            </details>

                            <details className="bg-card rounded-lg border border-border">
                                <summary className="p-6 cursor-pointer font-medium text-lg hover:bg-muted/50">
                                    Is there a free trial?
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground">
                                    <p>All plans come with a 7-day free trial. No credit card required to start your trial.</p>
                                </div>
                            </details>

                            <details className="bg-card rounded-lg border border-border">
                                <summary className="p-6 cursor-pointer font-medium text-lg hover:bg-muted/50">
                                    How does billing work?
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground">
                                    <p>You're billed monthly in advance. You can cancel anytime and your plan will remain active until the end of your billing period.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
