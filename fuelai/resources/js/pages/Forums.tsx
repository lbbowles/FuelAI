import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

interface ForumPost {
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

export default function Forums() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('');
    const [sortBy, setSortBy] = useState('latest');

    // Mock forum data
    const forumPosts: ForumPost[] = [
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
        }
    ];

    const categories = [
        { id: 'all', name: 'All Categories', count: forumPosts.length },
        { id: 'recipes', name: 'Recipes', count: 5 },
        { id: 'nutrition', name: 'Nutrition', count: 8 },
        { id: 'meal-planning', name: 'Meal Planning', count: 12 },
        { id: 'success-stories', name: 'Success Stories', count: 6 },
        { id: 'support', name: 'Support', count: 4 },
        { id: 'feature-requests', name: 'Feature Requests', count: 3 }
    ];

    const popularTags = [
        'keto', 'vegan', 'meal-prep', 'beginner', 'protein', 'low-carb',
        'gluten-free', 'quick-meals', 'healthy', 'budget-friendly'
    ];

    const filteredPosts = forumPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            post.category.toLowerCase().replace(' ', '-') === selectedCategory;
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);

        return matchesSearch && matchesCategory && matchesTag;
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (sortBy) {
            case 'popular':
                return b.views - a.views;
            case 'replies':
                return b.replies - a.replies;
            case 'latest':
            default:
                return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        }
    });

    return (
        <>
            <Head title="Community Forums" />
            <Navbar />

            <div className="pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forums</h1>
                            <p className="text-gray-600">
                                Connect with fellow food enthusiasts, share recipes, and get cooking advice
                            </p>
                        </div>
                        <Link
                            href="/forums/create"
                            className="btn btn-primary inline-flex items-center gap-2 w-fit"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Create New Post
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-3">
                            <div className="space-y-6 sticky top-24">
                                {/* Search */}
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-4">
                                        <h3 className="font-semibold text-lg mb-3">Search Forums</h3>
                                        <div className="form-control">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    placeholder="Search posts..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="input input-bordered flex-1"
                                                />
                                                <button className="btn btn-square btn-primary">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-4">
                                        <h3 className="font-semibold text-lg mb-3">Categories</h3>
                                        <ul className="menu menu-compact w-full">
                                            {categories.map(category => (
                                                <li key={category.id}>
                                                    <button
                                                        onClick={() => setSelectedCategory(category.id)}
                                                        className={`flex justify-between items-center w-full text-left ${
                                                            selectedCategory === category.id ? 'active bg-primary text-white' : ''
                                                        }`}
                                                    >
                                                        <span>{category.name}</span>
                                                        <span className="badge badge-sm opacity-70">{category.count}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Popular Tags */}
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-4">
                                        <h3 className="font-semibold text-lg mb-3">Popular Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {popularTags.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                                                    className={`badge badge-outline cursor-pointer hover:badge-primary text-xs ${
                                                        selectedTag === tag ? 'badge-primary' : ''
                                                    }`}
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Forum Stats */}
                                <div className="card bg-white shadow-lg">
                                    <div className="card-body p-4">
                                        <h3 className="font-semibold text-lg mb-3">Forum Stats</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Total Posts</span>
                                                <span className="font-semibold text-blue-600">1,234</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Active Users</span>
                                                <span className="font-semibold text-green-600">89</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">New Today</span>
                                                <span className="font-semibold text-orange-600">12</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            {/* Filters and Sort */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {selectedCategory !== 'all' && (
                                        <div className="badge badge-primary">
                                            {categories.find(c => c.id === selectedCategory)?.name}
                                        </div>
                                    )}
                                    {selectedTag && (
                                        <div className="badge badge-secondary gap-1">
                                            #{selectedTag}
                                            <button
                                                onClick={() => setSelectedTag('')}
                                                className="ml-1 hover:text-white/70"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="select select-bordered w-full max-w-xs"
                                >
                                    <option value="latest">Latest Activity</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="replies">Most Replies</option>
                                </select>
                            </div>

                            {/* Forum Posts */}
                            <div className="space-y-4">
                                {sortedPosts.map(post => (
                                    <div key={post.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="card-body p-6">
                                            <div className="flex gap-4">
                                                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-semibold">{post.authorAvatar}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                        {post.isPinned && (
                                                            <div className="badge badge-warning gap-1">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                                                </svg>
                                                                Pinned
                                                            </div>
                                                        )}
                                                        {post.isAnswered && (
                                                            <div className="badge badge-success gap-1">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                Answered
                                                            </div>
                                                        )}
                                                        <div className="badge badge-ghost">
                                                            {post.category}
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={`/forums/${post.id}`}
                                                        className="link link-hover no-underline"
                                                    >
                                                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
                                                            {post.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-gray-600 mb-3 leading-relaxed">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {post.tags.map(tag => (
                                                            <button
                                                                key={tag}
                                                                onClick={() => setSelectedTag(tag)}
                                                                className="badge badge-outline badge-sm cursor-pointer hover:badge-primary"
                                                            >
                                                                #{tag}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
                                                        <div className="flex items-center gap-4">
                                                            <span>by {post.author}</span>
                                                            <div className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                                </svg>
                                                                {post.replies} replies
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                {post.views} views
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            Last activity {post.lastActivity} by {post.lastActivityBy}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 text-center">
                                <button className="btn btn-outline btn-lg">
                                    Load More Posts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
