export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    inquiryType: string;
}

export const faqs = [
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
    }
];


