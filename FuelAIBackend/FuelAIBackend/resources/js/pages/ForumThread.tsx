import { Head, Link, useForm, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { FormEvent, useState } from 'react';

interface Post {
    id: number;
    content: string;
    author: string;
    authorAvatar: string;
    createdAt: string;
    userId: number;
}

interface Thread {
    id: number;
    title: string;
    category: string;
    author: string;
    createdAt: string;
    userId: number;
}

interface ForumThreadProps {
    thread: Thread;
    posts: Post[];
    auth: {
        user: {
            id: number;
            username: string;
        }
    }
}

interface ReplyFormData {
    content: string;
}

export default function ForumThread({ thread, posts, auth }: ForumThreadProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ReplyFormData>({
        content: ''
    });

    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState<string>('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(`/forums/${thread.id}/reply`, {
            onSuccess: () => {
                reset();
            }
        });
    };

    const handleAiReply = async () => {
        setIsAiLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/forums/${thread.id}/ai-reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            console.log('Response status:', response.status);
            console.log('Response data:', result);

            if (response.ok) {
                router.reload({ only: ['posts'] });
            } else {
                console.error('API error:', result);
                alert('Failed to generate AI response: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('AI reply error:', error);
            alert('Failed to generate AI response: ' + error);
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleDeleteThread = () => {
        if (confirm('Are you sure you want to delete this entire thread? This cannot be undone.')) {
            router.delete(`/forums/${thread.id}`);
        }
    };

    const handleDeletePost = (postId: number) => {
        if (confirm('Are you sure you want to delete this post? This cannot be undone.')) {
            router.delete(`/forums/${thread.id}/posts/${postId}`);
        }
    };

    const startEditPost = (post: Post) => {
        setEditingPostId(post.id);
        setEditContent(post.content);
    };

    const cancelEdit = () => {
        setEditingPostId(null);
        setEditContent('');
    };

    const handleUpdatePost = (postId: number) => {
        router.put(`/forums/${thread.id}/posts/${postId}`, {
            content: editContent
        }, {
            onSuccess: () => {
                setEditingPostId(null);
                setEditContent('');
            }
        });
    };

    return (
        <>
            <Head title={thread.title}>
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="mt-16 pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-5xl">

                    {/* Thread Header */}
                    <div className="card bg-white shadow-lg mb-6">
                        <div className="card-body p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="badge badge-ghost mb-2">{thread.category}</div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {thread.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>Author: {thread.author}</span>
                                        <span>•</span>
                                        <span>{thread.createdAt}</span>
                                        <span>•</span>
                                        <span>{posts.length} replies</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="/forums" className="btn btn-ghost btn-sm">
                                        Back
                                    </Link>
                                    <button
                                        onClick={handleAiReply}
                                        disabled={isAiLoading}
                                        className="btn btn-ghost btn-sm"
                                    >
                                        {isAiLoading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                Ask AI
                                            </>
                                        )}
                                    </button>
                                    {auth.user.id === thread.userId && (
                                        <button
                                            onClick={handleDeleteThread}
                                            className="btn btn-error btn-sm"
                                        >
                                            Delete Thread
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts */}
                    <div className="space-y-4 mb-6">
                        {posts.map((post, index) => (
                            <div key={post.id} className="card bg-white shadow-lg">
                                <div className="card-body p-6">
                                    <div className="flex gap-4">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                                                <span className="text-sm font-semibold">
                                                    {post.authorAvatar}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {post.author}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {post.createdAt}
                                                        {index === 0 && (
                                                            <span className="badge badge-primary badge-sm ml-2">
                                                                Author
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {editingPostId === post.id ? (
                                                <div className="space-y-3">
                                                    <textarea
                                                        value={editContent}
                                                        onChange={(e) => setEditContent(e.target.value)}
                                                        className="textarea textarea-bordered w-full h-32"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleUpdatePost(post.id)}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="btn btn-ghost btn-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="prose max-w-none">
                                                        <p className="whitespace-pre-wrap text-gray-700">
                                                            {post.content}
                                                        </p>
                                                    </div>

                                                    {/* Post Actions */}
                                                    {auth.user.id === post.userId && (
                                                        <div className="flex gap-2 mt-4 pt-4 border-t">
                                                            <button
                                                                onClick={() => startEditPost(post)}
                                                                className="btn btn-ghost btn-sm"
                                                            >
                                                                Edit
                                                            </button>
                                                            {index !== 0 && (
                                                                <button
                                                                    onClick={() => handleDeletePost(post.id)}
                                                                    className="btn btn-ghost btn-sm text-error"
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reply Form */}
                    <div className="card bg-white shadow-lg">
                        <div className="card-body p-6">
                            <h3 className="text-xl font-bold mb-4">Reply!</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <textarea
                                        placeholder="Content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className={`textarea textarea-bordered w-full h-32 ${
                                            errors.content ? 'textarea-error' : ''
                                        }`}
                                        disabled={processing}
                                    />
                                    {errors.content && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.content}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500">
                                        {data.content.length} Character Count
                                    </p>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={processing || !data.content.trim()}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Loading
                                            </>
                                        ) : (
                                            <>
                                                Submit
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
