

// Forum Data
export interface ForumPostInterface {
    id: number;
    title: string;
    author: string;
    authorAvatar: string;
    category: string;
    tags: string[];
    excerpt: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastActivityBy: string;
    isPinned?: boolean;
    isAnswered?: boolean;
}

// Tags here are useless for now (?)
export const forumPosts = [
    {
        id: 1,
        title: "Best keto recipes for beginners?",
        author: "Sarah Johnson",
        authorAvatar: "SJ",
        category: "Recipes",
        tags: ["keto", "beginner", "low-carb"],
        excerpt: "I'm just starting my keto journey and looking for some easy recipes to get started. What are your favorites?",
        replies: 23,
        views: 456,
        lastActivity: "2 hours ago",
        lastActivityBy: "Mike Chen",
        isPinned: true
    },
    {
        id: 2,
        title: "AI-generated recipe turned out amazing!",
        author: "Alex Rodriguez",
        authorAvatar: "AR",
        category: "Success Stories",
        tags: ["ai-recipes", "success"],
        excerpt: "Just tried the Mediterranean chicken recipe that FuelAI generated for me and my family loved it! Here's what I learned...",
        replies: 15,
        views: 289,
        lastActivity: "4 hours ago",
        lastActivityBy: "Emma Wilson",
        isAnswered: true
    },
    {
        id: 3,
        title: "Meal prep ideas for busy professionals",
        author: "David Kim",
        authorAvatar: "DK",
        category: "Meal Planning",
        tags: ["meal-prep", "professional", "time-saving"],
        excerpt: "Working 60+ hour weeks and struggling to eat healthy. What are your best meal prep strategies?",
        replies: 31,
        views: 678,
        lastActivity: "6 hours ago",
        lastActivityBy: "Lisa Park"
    },
    {
        id: 4,
        title: "Vegan protein sources - comprehensive guide",
        author: "Maya Patel",
        authorAvatar: "MP",
        category: "Nutrition",
        tags: ["vegan", "protein", "nutrition"],
        excerpt: "Complete guide to plant-based proteins with nutritional breakdowns and recipe suggestions.",
        replies: 42,
        views: 892,
        lastActivity: "8 hours ago",
        lastActivityBy: "Tom Anderson"
    },
    {
        id: 5,
        title: "Feature request: Grocery list generation",
        author: "Jennifer Lee",
        authorAvatar: "JL",
        category: "Feature Requests",
        tags: ["feature-request", "grocery"],
        excerpt: "Would love to see automatic grocery list generation based on selected recipes. Anyone else interested?",
        replies: 18,
        views: 234,
        lastActivity: "12 hours ago",
        lastActivityBy: "Kevin Brown"
    },
    {
        id: 6,
        title: "Troubleshooting recipe scaling issues",
        author: "Robert Taylor",
        authorAvatar: "RT",
        category: "Support",
        tags: ["support", "scaling", "bug"],
        excerpt: "Having trouble with recipe scaling feature. Measurements don't seem to calculate correctly for larger servings.",
        replies: 7,
        views: 156,
        lastActivity: "1 day ago",
        lastActivityBy: "Support Team"
    }]

export const categories = [
    { id: 'all', name: 'All Categories', count: forumPosts.length },
    { id: 'recipes', name: 'Recipes', count: 5 },
    { id: 'nutrition', name: 'Nutrition', count: 8 },
    { id: 'meal-planning', name: 'Meal Planning', count: 12 },
    { id: 'success-stories', name: 'Success Stories', count: 6 },
    { id: 'support', name: 'Support', count: 4 },
    { id: 'feature-requests', name: 'Feature Requests', count: 3 }
];
