import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    inquiryType: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitSuccess(true);
            setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
        } catch (error) {
            setSubmitSuccess(false);
            setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
            title: 'Email',
            description: 'Send us an email anytime',
            contact: 'hello@fuelai.com',
            action: 'mailto:hello@fuelai.com'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ),
            title: 'Phone',
            description: 'Call us during business hours',
            contact: '+1 (555) 123-4567',
            action: 'tel:+15551234567'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ),
            title: 'Office',
            description: 'Visit our headquarters',
            contact: '123 Real Drive, Cool City, NC 12345',
            action: 'https://maps.google.com'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Business Hours',
            description: 'Monday - Friday',
            contact: '9:00 AM - 6:00 PM PST',
            action: ''
        }
    ];

    const faqs = [
        {
            question: 'How does the AI recipe generation work?',
            answer: 'Our AI analyzes your dietary preferences, allergies, and nutritional goals to create personalized recipes. It uses advanced language models to ensure recipes are both delicious and meet your specific requirements.'
        },
        {
            question: 'Is FuelAI free to use?',
            answer: 'We offer a free tier with basic features. Premium plans unlock advanced AI models, unlimited recipe generation, and additional features like meal planning and nutritional analysis.'
        },
        {
            question: 'Can I customize recipes for specific dietary restrictions?',
            answer: 'Absolutely! Our system handles various dietary requirements including vegetarian, vegan, keto, gluten-free, and many others. You can also specify allergies and food preferences.'
        },
        {
            question: 'How accurate are the nutritional calculations?',
            answer: 'Our nutritional information is generated based on standard food databases and is intended for general guidance. For precise medical or dietary needs, please consult with a healthcare professional.'
        }
    ];

    return (
        <>
            <Head title="Contact Us" />
            <Navbar />

            <div className="pt-16 min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Have questions about FuelAI? We'd love to hear from you.
                            Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-card p-8 rounded-lg border border-border">
                            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Inquiry Type</label>
                                    <select
                                        value={formData.inquiryType}
                                        onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                                        className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing & Plans</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="press">Press & Media</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Brief description of your inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Message *</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Tell us more about your question or how we can help..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitMessage && (
                                    <div className={`p-4 rounded-lg ${
                                        submitSuccess
                                            ? 'bg-green-100 border border-green-400 text-green-700'
                                            : 'bg-red-100 border border-red-400 text-red-700'
                                    }`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Other ways to reach us</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {contactMethods.map((method, index) => (
                                        <div key={index} className="bg-card p-6 rounded-lg border border-border">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                    {method.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                                                    {method.action ? (
                                                        <a
                                                            href={method.action}
                                                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                                        >
                                                            {method.contact}
                                                        </a>
                                                    ) : (
                                                        <p className="text-sm font-medium text-foreground">{method.contact}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <details key={index} className="bg-card rounded-lg border border-border">
                                            <summary className="p-4 cursor-pointer font-medium hover:bg-muted/50 transition-colors">
                                                {faq.question}
                                            </summary>
                                            <div className="px-4 pb-4 text-sm text-muted-foreground">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center bg-card p-8 rounded-lg border border-border">
                        <h3 className="text-2xl font-semibold mb-4">Ready to start cooking with AI?</h3>
                        <p className="text-muted-foreground mb-6">
                            Join thousands of users who are already creating amazing recipes with FuelAI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/register"
                                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Get Started Free
                            </a>
                            <a
                                href="/plans"
                                className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                View Plans
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
