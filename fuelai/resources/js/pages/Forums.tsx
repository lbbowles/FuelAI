import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { ForumPostInterface, forumPosts, categories } from '@/data/forumData';

// TO DO:
// Add in ability to create and delete forums
// Send data to the database (instead of placeholder)
// Swap off badges for pinned/answered (looks bad)
// Add in proper view count
// Add in view of forums
// Add in commenting in forums
// Add in being able to call the AI.
// Add Gradients to keep it consist

type forumPosts = ForumPostInterface; // pull from @/data/forumsData

export default function Forums() {

    // Set initial state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('');
    const [sortBy, setSortBy] = useState('latest');

    // Filter Post (doesn't even work half the time)
    const filteredPosts = forumPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            post.category.toLowerCase().replace(' ', '-') === selectedCategory;
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);

        return matchesSearch && matchesCategory && matchesTag;
    });

    //
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

    // fuck tailwind
    return (
        <>
            <Head title="Forums">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <Navbar />

            <div className="pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forums</h1>
                            <p className="text-gray-600">
                                Connect with fellow food enthusiasts, share recipes, and get cooking advice
                            </p>
                        </div>
                        {/* Not implemented yet */}
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
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            {/* Filters */}
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
                                                    {/* Not implemented yet */}
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
                                                        </div>
                                                        <div className="text-right">
                                                            Last activity {post.lastActivity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Error Display */}
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
