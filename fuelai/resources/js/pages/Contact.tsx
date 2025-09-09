import { Head } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { ContactFormData, faqs } from '@/data/contactData';


// TO DO:
// Send data to database
// Change placeholder data to be actually useful
// Add Gradients to keep it consist

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


    // Tweak to send data to database instead of the air
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
        } finally {
            setIsSubmitting(false);
        }
    };



    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                    />
                </svg>
            ),
            title: 'Email',
            description: 'Send us an email anytime',
            contact: 'hello@fuelai.com',
            action: 'mailto:hello@fuelai.com',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                </svg>
            ),
            title: 'Phone',
            description: 'Call us during business hours',
            contact: '+1 (555) 123-4567',
            action: 'tel:+15551234567',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                </svg>
            ),
            title: 'Office',
            description: 'Visit our headquarters',
            contact: '123 Real Drive, Cool City, NC 12345',
            action: 'https://maps.google.com',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
            title: 'Business Hours',
            description: 'Monday - Friday',
            contact: '9:00 AM - 6:00 PM PST',
            action: '',
        },
    ];

    return (
        <>
            <Head title="Contact Us">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <Navbar />

            <div className="min-h-screen bg-background pt-16">
                <div className="mx-auto max-w-7xl px-4 py-12">
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground">Get in Touch</h1>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                            Have questions about FuelAI? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="rounded-lg border border-border bg-card p-8">
                            <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full rounded-lg border border-border bg-background p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full rounded-lg border border-border bg-background p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Inquiry Type</label>
                                    <select
                                        value={formData.inquiryType}
                                        onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                                        className="w-full rounded-lg border border-border bg-background p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
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
                                    <label className="mb-2 block text-sm font-medium">Subject *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        className="w-full rounded-lg border border-border bg-background p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                                        placeholder="Brief description of your inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Message *</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        className="w-full rounded-lg border border-border bg-background p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                                        placeholder="Tell us more about your question or how we can help..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitMessage && (
                                    <div
                                        className={`rounded-lg p-4 ${
                                            submitSuccess
                                                ? 'border border-green-400 bg-green-100 text-green-700'
                                                : 'border border-red-400 bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="mb-6 text-2xl font-semibold">Other ways to reach us</h2>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {contactMethods.map((method, index) => (
                                        <div key={index} className="rounded-lg border border-border bg-card p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    {method.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-1 font-semibold text-foreground">{method.title}</h3>
                                                    <p className="mb-2 text-sm text-muted-foreground">{method.description}</p>
                                                    {method.action ? (
                                                        <a
                                                            href={method.action}
                                                            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
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

                            {/* FAQ */}
                            <div>
                                <h2 className="mb-6 text-2xl font-semibold">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <details key={index} className="rounded-lg border border-border bg-card">
                                            <summary className="cursor-pointer p-4 font-medium transition-colors hover:bg-muted/50">
                                                {faq.question}
                                            </summary>
                                            <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
